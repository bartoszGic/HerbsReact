import CartBtn from './CartBtn'
import LogBtn from './LogBtn'
import SearchBtn from './SearchBtn'
import { modalsStatesActions } from '../store/modalsStates-slice'
import { useDispatch, useSelector } from 'react-redux'
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from '../../firebase-config'
import { useEffect } from "react";
import { cartHerbsActions } from '../store/cartHerbs-slice'
import { favoritesActions } from '../store/favorites-slice'
import { onAuthStateChanged } from 'firebase/auth'

const Header = (props) => {
    const userCart = useSelector(state => state.cartHerbs)
    const uploadPermition = useSelector(state => state.modalContent.uploadPermition)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(modalsStatesActions.trueLogState())
                const downloadUserData = async () => {
                    try {
                        const docRef = doc(db, 'users', user.uid)
                        const userDoc = await getDoc(docRef)
                        const downloadedUserCart = userDoc.data().userCart
                        const downloadedUserFavorites = userDoc.data().userFavorites
                        dispatch(cartHerbsActions.showDownloadedUserCart(downloadedUserCart))
                        dispatch(favoritesActions.showDownloadedUserFavorites(downloadedUserFavorites))
                        dispatch(modalsStatesActions.uploadPermition())
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                downloadUserData()
            }
        })
    }, [dispatch])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uploadUserCart = async () => {
                    try {
                        const docRef = doc(db, 'users', user.uid)
                        if (uploadPermition) {
                            await updateDoc(docRef, {
                                userCart: userCart
                            })
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                uploadUserCart()
            }
        })
    }, [dispatch, userCart, uploadPermition])

    return (
        <header className='fixed bg-teal-500 text-white w-full z-20'>
            <section className='flex justify-between max-w-4xl mx-auto items-center p-2 lg:lg:max-w-5xl'>
                <button onClick={() => window.location.reload()}>
                    <h1 className='text-2xl'>HerbsReact</h1>
                </button>
                <div className='flex'>
                    <LogBtn
                        onClick={props.onToggleUserToolsHandler} />
                    <SearchBtn
                        onClick={props.onToggleSearchInputHandler} />
                    <CartBtn
                        onClick={props.onToggleCartHandler} />
                </div>
            </section>
        </header >
    )
}

export default Header