import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth, db } from '../../firebase-config'
import { doc, updateDoc } from 'firebase/firestore'
import { modalsStatesActions } from '../store/modalsStates-slice'
import HerbActionsFavorites from './HerbActionsFavorites'
import HerbActionsChooseWeight from './HerbActionsChooseWeight'

const HerbActions = (props) => {
    const [weight, setWeight] = useState(10)
    const [heartColor, setHeartColor] = useState('none')
    const favorites = useSelector(state => state.favorites)
    const uploadPermition = useSelector(state => state.modalContent.uploadPermition)
    const dispatch = useDispatch()
    const currentUser = auth.currentUser
    let revsTextColor
    let currentUserUid
    let rating =

        currentUser !== null ? currentUserUid = currentUser.uid : currentUserUid = ''

    props.reviewsNumber === 0 ? revsTextColor = 'text-gray-400' : revsTextColor = 'text-teal-500 font-medium'

    !isNaN(props.ratingAverage) ? rating = props.ratingAverage : rating = ''

    const choseWeightHandler = (value) => {
        setWeight(value)
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
        if (favorites.likes.includes(props.herbName)) {
            setHeartColor('#B81426')
        } else {
            setHeartColor('none')
        }
    }, [favorites, props])

    useEffect(() => {
        const uploadUserCart = async () => {
            if (currentUserUid !== '') {
                try {
                    const docRef = doc(db, 'users', currentUserUid)
                    if (uploadPermition) {
                        await updateDoc(docRef, {
                            userFavorites: favorites
                        })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        uploadUserCart()
    }, [favorites, uploadPermition, currentUserUid])

    return (
        <div className='col-start-3 col-span-3 mt-4'>
            <div className='grid grid-cols-3'>
                <HerbActionsChooseWeight
                    onWeightChange={props.onWeightChange}
                    onChoseWeightHandler={choseWeightHandler}
                    weight={weight}
                />
                <HerbActionsFavorites
                    onAddAndRemoveToFavorites={onAddAndRemoveToFavorites}
                    heartColor={heartColor}
                />
                <div className='col-span-1 text-right'>
                    <button className='bg-teal-500 text-gray-50 rounded-2xl px-3 py-1 transition duration-100 hover:opacity-90'
                        onClick={() => props.onAddToCart(weight)}>Add</button>
                </div>
                <button onClick={toggleAndSetReviewedHerb} className={`flex justify-end items-center col-span-3 text-right mt-4 ${revsTextColor} font-normal transition duration-100 hover:opacity-90`} >
                    {rating}
                    <span className='inline-block align-middle'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#eab308" viewBox="0 0 24 24" strokeWidth="1" stroke="#eab308" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                    <span>
                        <span className='text-gray-500'>Reviews </span>
                        {`${props.reviewsNumber}`}
                    </span>
                </button>
            </div>
        </div>
    )
}
export default HerbActions