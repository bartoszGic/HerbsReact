import { useState } from "react"
import Modal from "../UI/Modal"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../firebase-config"
import { useDispatch, useSelector } from "react-redux"
import { modalsStatesActions } from "../store/modalsStates-slice"
import { favoritesActions } from "../store/favorites-slice"
import { cartHerbsActions } from "../store/cartHerbs-slice"

const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const cartHerbs = useSelector(state => state.cartHerbs)

    const updateFavorites = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        const currentUserFavorites = docSnap.data().userFavorites.likes
        const freeAddedFavorites = [...favorites.likes]
        for (let i = 0; i < currentUserFavorites.length; i++) {
            let element = currentUserFavorites[i]
            !freeAddedFavorites.includes(element) && freeAddedFavorites.push(element)
        }
        await updateDoc(docRef, {
            userFavorites: {
                likes: freeAddedFavorites
            }
        })
        const newDocSnap = await getDoc(docRef)
        const newUserFavorites = newDocSnap.data().userFavorites
        dispatch(favoritesActions.showDownloadedUserFavorites(newUserFavorites))
    }

    const updateCart = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const freeAddedCart = { ...cartHerbs }
        await updateDoc(docRef, {
            userCart: freeAddedCart
        })
        const docSnap = await getDoc(docRef)
        const newUserCart = docSnap.data().userCart
        dispatch(cartHerbsActions.showDownloadedUserCart(newUserCart))
    }

    const signInHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            updateFavorites()
            updateCart()
            dispatch(modalsStatesActions.trueLogState())
            setLoading(false)
        }
        catch (error) {
            console.error(error)
            setLoading(false)
            if (error.code === 'auth/user-not-found') {
                setEmailError('User not found')
                setPasswordError('')
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('Invalid password')
            } else if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email')
            }
        }
    }
    const showSignUpPanelHandler = () => {
        dispatch(modalsStatesActions.register())
    }

    if (loading) {
        return (
            <Modal onClick={props.onToggleUserToolsHandler}>
                <div role="status" className="flex justify-center">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-700 fill-teal-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </Modal>
        )
    }

    return (
        <Modal onClick={props.onToggleUserToolsHandler}>
            <div className="flex flex-col">
                <div className="text-center font-medium text-xl mb-4">Sign In</div>
                <form className="flex flex-col items-center" onSubmit={signInHandler}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="emailIn" className="mb-1">E-mail</label>
                        <input className="border py-2 px-3 mb-2 text-gray-700 leading-tight rounded-xl"
                            type="text"
                            id='emailIn'
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="text-center text-[#B81426]">{emailError}</div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="passwordIn" className="mb-1">Password</label>
                        <input className="border py-2 px-3 mb-2 text-gray-700 leading-tight rounded-xl"
                            type="password"
                            id='passwordIn'
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="text-center text-[#B81426]">{passwordError}</div>
                    <button className='flex w-full bg-teal-500 text-gray-50 justify-center rounded-xl  px-3 py-1 mt-6 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Sign In</button>
                </form>
                <div className="text-right text-gray-700">Don' t have acount ?
                    <button onClick={showSignUpPanelHandler} className="text-[#B81426] font-bold ml-2 p-1 transition duration-100 hover:opacity-90 active:animate-animeBtn">Sign Up</button>
                </div>
            </div>
        </Modal>
    )
}
export default SignIn