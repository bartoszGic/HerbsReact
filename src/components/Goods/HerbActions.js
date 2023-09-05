import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth, db } from '../../firebase-config'
import { doc, updateDoc } from 'firebase/firestore'
import HerbActionsFavorites from './HerbActionsFavorites'
import HerbActionsChooseWeight from './HerbActionsChooseWeight'
import HerbActionsReviewsBtn from './HerbActionsReviewsBtn'
import { onAuthStateChanged } from 'firebase/auth'

const HerbActions = (props) => {
    const [weight, setWeight] = useState(10)
    const favorites = useSelector(state => state.favorites)
    const uploadPermition = useSelector(state => state.modalContent.uploadPermition)

    const choseWeightHandler = (value) => {
        setWeight(value)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uploadUserCart = async () => {
                    try {
                        const docRef = doc(db, 'users', user.uid)
                        if (uploadPermition) {
                            await updateDoc(docRef, {
                                userFavorites: favorites
                            })
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                uploadUserCart()
            }
        })
    }, [favorites, uploadPermition])

    return (
        <div className='col-start-3 col-span-3 mt-4'>
            <div className='grid grid-cols-3'>
                <HerbActionsChooseWeight
                    onWeightChange={props.onWeightChange}
                    onChoseWeightHandler={choseWeightHandler}
                    weight={weight}
                />
                <HerbActionsFavorites
                    herbName={props.herbName}
                />
                <div className='col-span-1 text-right'>
                    <button className='bg-teal-500 text-gray-50 rounded-2xl px-3 py-1 transition duration-100 hover:opacity-90'
                        onClick={() => props.onAddToCart(weight)}>Add</button>
                </div>
                <HerbActionsReviewsBtn
                    toggleReviews={props.toggleReviews}
                    reviewsNumber={props.reviewsNumber}
                    ratingAverage={props.ratingAverage}
                    herbName={props.herbName}
                />
            </div>
        </div>
    )
}
export default HerbActions