import { useSelector } from "react-redux"
import { modalsStatesActions } from "../store/modalsStates-slice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { getDoc, updateDoc } from "firebase/firestore"
import { doc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { auth } from "../../firebase-config"
import ReviewInputRating from "./ReviewInputRating"

const ReviewInput = (props) => {
    // console.log('ReviewsInput');
    const dispatch = useDispatch()
    const logState = useSelector(state => state.modalContent.logState)
    const [inputValue, setInputValue] = useState('')
    const [rating, setRating] = useState(null)

    const showSignInPanelHandler = () => {
        dispatch(modalsStatesActions.login())
        props.onToggleReviewsHandler()
        props.onToggleUserToolsHandler()
    }
    const getRating = (val) => {
        setRating(val)
    }

    const addReviewHandler = async (e) => {
        e.preventDefault()
        try {
            const date = new Date()
            const newReview = {
                user: auth.currentUser.email,
                review: inputValue,
                time: date.getTime(),
                rate: rating
            }
            const docRef = doc(db, 'herbsReviews', props.herbName)
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data().reviews
            docData.push(newReview)
            await updateDoc(docRef, {
                reviews: docData
            })
            const newDocSnap = await getDoc(docRef);
            const newDocData = newDocSnap.data().reviews
            props.getReview(newDocData)
            setInputValue('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {logState ?
                <form className="flex flex-col justify-center mt-4" onSubmit={addReviewHandler}>
                    <textarea className="w-full h-20 resize-none border rounded-xl py-2 px-3 text-xs"
                        type="text"
                        id='writeReview'
                        placeholder="Write review..."
                        maxLength='300'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="flex justify-between mt-4">
                        <ReviewInputRating getRating={getRating} />
                        <button type="submit" className='bg-teal-500 text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Add review</button>
                    </div>
                </form>
                :
                <div className="text-center text-gray-700 mt-4">To write review you need to
                    <button className="text-[#B81426] font-bold ml-2 p-1 transition duration-100 hover:opacity-90 active:animate-animeBtn" onClick={showSignInPanelHandler}>Sign In</button>
                </div>
            }
        </>
    )
}
export default ReviewInput