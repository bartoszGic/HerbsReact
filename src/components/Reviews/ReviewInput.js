import { useSelector } from "react-redux"
import { modalsStatesActions } from "../store/modalsStates-slice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { auth } from "../../firebase-config"
import ReviewInputRating from "./ReviewInputRating"


const ReviewInput = (props) => {
    const dispatch = useDispatch()
    const logState = useSelector(state => state.modalContent.logState)
    const [inputValue, setInputValue] = useState('')
    const [rating, setRating] = useState(null)
    const [isEmpty, setIsEmpty] = useState(false)
    const currentUser = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))


    const showSignInPanelHandler = () => {
        dispatch(modalsStatesActions.login())
        props.onToggleReviewsHandler()
        props.onToggleUserToolsHandler()
    }
    const getRating = (val) => {
        setRating(val)
    }

    const addReviewHandler = async () => {
        try {
            if (inputValue.trim() !== '') {
                const now = new Date()
                const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
                const newReview = {
                    user: currentUser,
                    review: inputValue,
                    time: date,
                    rate: rating,
                    key: now.getTime()
                }
                props.uploadReviews(newReview)
                setInputValue('')
                setIsEmpty(false)
            } else {
                setIsEmpty(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {logState ?
                <form className="flex flex-col justify-center mt-4">
                    <textarea className={`w-full h-20 resize-none rounded-xl border ${isEmpty ? "border-[#B81426]" : 'border'} py-2 px-3 text-xs`}
                        type="text"
                        id='writeReview'
                        placeholder="Write review..."
                        maxLength='300'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <ReviewInputRating
                        getRating={getRating}
                        onAddReviewHandler={addReviewHandler}
                        reviewExist={props.reviewExist}
                    />
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