import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase-config'
import { db } from '../../firebase-config'
import { doc } from 'firebase/firestore'
import { updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { modalsStatesActions } from '../store/modalsStates-slice'

const HerbActions = (props) => {
    // console.log('HerbOrderDetail');
    const [weight, setWeight] = useState(10)
    const [showList, setShowList] = useState(false)
    const [heartColor, setHeartColor] = useState('none')
    const refOne = useRef(null)
    const favorites = useSelector(state => state.favorites)
    const uploadPermition = useSelector(state => state.modalContent.uploadPermition)
    const dispatch = useDispatch()

    const choseWeightHandler = (value) => {
        setWeight(value)
        setShowList(false)
    }
    const outsideClickCatch = (e) => {
        !refOne.current.contains(e.target) && setShowList(false)
    }
    const onAddAndRemoveToFavorites = () => {
        if (!favorites.likes.includes(props.herbName)) {
            props.onAddToFavorites()
        } else {
            props.onRemoveFromFavorites()
        }
    }
    const toggleAndSetReviewedHerb = () => {
        props.toggleReviews()
        dispatch(modalsStatesActions.setReviewedHerb(props.herbName))
    }

    useEffect(() => {
        props.onWeightChange(weight)
        setShowList(false)
    }, [weight, props])

    useEffect(() => {
        document.addEventListener('click', outsideClickCatch)
    }, [])

    useEffect(() => {
        if (favorites.likes.includes(props.herbName)) {
            setHeartColor('#B81426')
        } else {
            setHeartColor('none')
        }
    }, [favorites, props])

    useEffect(() => {
        //Kiedy użytkownik sie wylogowuje i ponownie loguje za każdym razem ilość zapytań do serwera się zwieksza, ddy usunę onAuthStateChanged działa poprawnie ale wyskakuje błąd Cannot read properties of null (reading 'uid')

        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        const uploadUserCart = async () => {
            try {
                const docRef = doc(db, 'users', auth.currentUser.uid)
                if (uploadPermition) {
                    await updateDoc(docRef, {
                        userFavorites: favorites
                    })
                }
            } catch (error) {
                // console.log(error);
            }
        }
        uploadUserCart()
        //     }
        // })
    }, [favorites, uploadPermition, props])

    return (
        <div className='col-start-3 col-span-3'>
            <div className='grid grid-cols-3'>
                <div className='w-full cursor-pointer text-slate-500 z-10' ref={refOne}>
                    <div className='flex items-center justify-between' onClick={() => setShowList(state => !state)}>
                        {weight}g
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <ul className={`absolute flex-col mt-1 transition bg-white p-1 rounded-md ${showList ? 'flex' : 'hidden'}`}>
                        <li value="10" className='transition duration-100 hover:text-black' onClick={(e) => choseWeightHandler(e.target.value)}>10g</li>
                        <li value="50" className='transition duration-100 hover:text-black' onClick={(e) => choseWeightHandler(e.target.value)}>50g</li>
                        <li value="100" className='transition duration-100 hover:text-black' onClick={(e) => choseWeightHandler(e.target.value)}>100g</li>
                    </ul>
                </div>
                <div className='col-span-1 flex justify-end items-center text-right'>
                    <button className='cursor-pointer text-[#B81426] sm:mr-2 transition duration-100 hover:scale-110'
                        onClick={onAddAndRemoveToFavorites}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={heartColor} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </div>
                <div className='col-span-1 text-right'>
                    <button className='bg-teal-500 text-gray-50 rounded-2xl px-3 py-1 transition duration-100 hover:opacity-90'
                        onClick={() => props.onAddToCart(weight)}>Add</button>
                </div>
                <button onClick={toggleAndSetReviewedHerb} className='col-span-3 text-right mt-2 text-gray-500'>Reviews (3)</button>
            </div>
        </div>
    )
}
export default HerbActions