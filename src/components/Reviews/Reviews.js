import Modal from "../UI/Modal"
import { useSelector } from "react-redux"


const Reviews = (props) => {
    const reviewedHerb = useSelector(state => state.modalContent.reviewedHerb)

    return (
        <Modal onClick={props.onToggleReviewsHandler}>
            <div>
                <div>
                    <h1>{reviewedHerb}</h1>
                </div>
            </div>
        </Modal>
    )
}
export default Reviews