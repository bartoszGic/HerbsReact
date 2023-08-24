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

const Header = (props) => {
    const userCart = useSelector(state => state.cartHerbs)
    const uploadPermition = useSelector(state => state.modalContent.uploadPermition)
    const dispatch = useDispatch()
    const currentUser = auth.currentUser
    let currentUserUid

    currentUser !== null ? currentUserUid = currentUser.uid : currentUserUid = ''

    useEffect(() => {
        if (currentUserUid !== '') {
            dispatch(modalsStatesActions.trueLogState())
            const downloadUserData = async () => {
                try {
                    const docRef = doc(db, 'users', currentUserUid)
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
    }, [dispatch, currentUserUid])

    useEffect(() => {
        const uploadUserCart = async () => {
            if (currentUserUid !== '') {
                try {
                    const docRef = doc(db, 'users', currentUserUid)
                    if (uploadPermition) {
                        await updateDoc(docRef, {
                            userCart: userCart
                        })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        uploadUserCart()
    }, [dispatch, userCart, uploadPermition, currentUserUid])

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