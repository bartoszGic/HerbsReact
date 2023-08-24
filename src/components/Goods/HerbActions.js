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

    currentUser !== null ? currentUserUid = currentUser.uid : currentUserUid = ''

    props.reviewsNumber === 0 ? revsTextColor = 'text-gray-400' : revsTextColor = 'text-teal-500 font-medium'

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
        <div className='col-start-3 col-span-3'>
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
                <button onClick={toggleAndSetReviewedHerb} className='col-span-3 text-right mt-2 text-gray-400 font-normal transition duration-100 hover:opacity-90'>Reviews <span className={`${revsTextColor}`}>{` ${props.reviewsNumber} `}</span></button>
            </div>
        </div>
    )
}
export default HerbActions