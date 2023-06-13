import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { herbsActions } from "../store/cartHerbs-slice";
import { getDoc } from "firebase/firestore";

const CartBtn = (props) => {
    // console.log('CartBtn');
    const dispatch = useDispatch()
    const cartHerbs = useSelector(state => state.cartHerbs.herbs)
    const sumCartHerbs = cartHerbs.reduce((curNum, herb) => {
        return curNum + herb.weight / herb.weight
    }, 0)

    useEffect(() => {
        console.log('CartBtn-effect');
        const uploadCartHerbs = () => {
            onAuthStateChanged(auth, user => {
                const userUID = user.uid
                const upload = async () => {
                    const docRef = doc(db, 'users', userUID)
                    try {
                        await updateDoc(docRef, {
                            cartHerbs: cartHerbs
                        })
                        // let downloadedCartHerbs = []
                        // const userDoc = await getDoc(docRef)
                        // const userCart = userDoc.data().cartHerbs
                        // downloadedCartHerbs = [...userCart]
                        // console.log(userCart);
                        // console.log(downloadedCartHerbs);
                        // dispatch(herbsActions.showDownloadedUserCart(downloadedCartHerbs))
                    } catch (error) {
                        console.log(error);
                    }
                }
                upload()
            })
        }
        auth.currentUser !== null && uploadCartHerbs()
    }, [dispatch, cartHerbs])

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            const userUID = user.uid
            const download = async () => {
                const docRef = doc(db, 'users', userUID)
                let downloadedCartHerbs = []
                const userDoc = await getDoc(docRef)
                const userCart = userDoc.data().cartHerbs
                downloadedCartHerbs = [...userCart]
                console.log(userCart);
                console.log(downloadedCartHerbs);
                dispatch(herbsActions.showDownloadedUserCart(downloadedCartHerbs))
            }
            download()
        })
    }, [dispatch])

    return (
        <button className='flex group items-center bg-teal-400 rounded-2xl py-1 px-2 opacity-80 transition duration-200 hover:shadow-none hover:opacity-100 max-sm:focus:opacity-100' onClick={props.onClick}>
            <span className='mx-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </span>
            <span className='font-medium text-[#B81426] mx-1'>
                <p>{sumCartHerbs}</p>
            </span>
        </button>
    )
}

export default CartBtn