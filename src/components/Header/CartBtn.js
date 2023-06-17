import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { herbsActions } from "../store/cartHerbs-slice";
import { getDoc } from "firebase/firestore";

const CartBtn = (props) => {
    // console.log('CartBtn');
    const dispatch = useDispatch()
    const cartHerbs = useSelector(state => state.cartHerbs.herbs)
    // const userState = useSelector(state => state.modalContent.logState)
    const sumCartHerbs = cartHerbs.reduce((curNum, herb) => {
        return curNum + herb.weight / herb.weight
    }, 0)

    // onAuthStateChanged(auth, user => {
    //     console.log(user);
    //     console.log(auth.currentUser);
    // })

    useEffect(() => {
        // console.log('CartBtn-effect-upload');
        const uploadCartHerbs = () => {
            onAuthStateChanged(auth, user => {
                const upload = async () => {
                    try {
                        const userUID = user.uid
                        const docRef = doc(db, 'users', userUID)
                        await updateDoc(docRef, {
                            cartHerbs: cartHerbs
                        })
                        console.log('upload');
                    } catch (error) {
                        console.log(error);
                    }
                }
                upload()
            })
        }
        auth.currentUser !== null && uploadCartHerbs()
    }, [dispatch, cartHerbs])

    // useEffect(() => {
    //     console.log('CartBtn-effect-download');
    //     const downloadCartHerbs = () => {
    //         const download = async () => {
    //             try {
    //                 const userUID = auth.currentUser.uid
    //                 const docRef = doc(db, 'users', userUID)
    //                 let downloadedCartHerbs = []
    //                 console.log(downloadedCartHerbs);
    //                 const userDoc = await getDoc(docRef)
    //                 console.log(userDoc);
    //                 const userCart = userDoc.data().cartHerbs
    //                 console.log(userCart);
    //                 downloadedCartHerbs = [...userCart]
    //                 console.log(downloadedCartHerbs);
    //                 dispatch(herbsActions.showDownloadedUserCart(downloadedCartHerbs))
    //                 console.log('download');
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         download()
    //     }
    //     downloadCartHerbs()
    // }, [dispatch])

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