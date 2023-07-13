import Modal from "../UI/Modal"
import { useSelector } from "react-redux"
import ReviewInput from "./ReviewInput"
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase-config";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import Review from "./Review";


const Reviews = (props) => {
    // console.log('Reviews');
    const reviewedHerb = useSelector(state => state.modalContent.reviewedHerb)
    const [downloadedReviews, setDownloadedReviews] = useState([])

    const getReview = (data) => {
        setDownloadedReviews(data)
    }

    useEffect(() => {
        const downloadReviews = async () => {
            try {
                const docRef = doc(db, 'herbsReviews', reviewedHerb)
                const docSnap = await getDoc(docRef);
                setDownloadedReviews(docSnap.data().reviews)
            } catch (error) {
                console.log(error);
            }
        }
        downloadReviews()
    }, [reviewedHerb])

    return (
        <Modal onClick={props.onToggleReviewsHandler}>
            <div className="flex flex-col">
                <h1 className="mb-2 font-medium">{reviewedHerb}</h1>
                <ul className="overflow-auto max-h-64">
                    {downloadedReviews.map((rev) => (
                        <Review
                            key={rev.time}
                            time={rev.time}
                            name={rev.user}
                            review={rev.review} />
                    ))}
                </ul>
                <ReviewInput
                    onToggleReviewsHandler={props.onToggleReviewsHandler}
                    onToggleUserToolsHandler={props.onToggleUserToolsHandler}
                    herbName={reviewedHerb}
                    getReview={getReview}
                />
            </div>
        </Modal>
    )
}
export default Reviews