import Modal from "../UI/Modal"
import { useSelector } from "react-redux"
import ReviewInput from "./ReviewInput"
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase-config";
import { doc } from "firebase/firestore";
import { getDoc, updateDoc } from "firebase/firestore";
import Review from "./Review";
import { auth } from "../../firebase-config";


const Reviews = (props) => {
    const currentUser = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))
    const reviewedHerb = useSelector(state => state.modalContent.reviewedHerb)
    const [downloadedReviews, setDownloadedReviews] = useState([])
    const [reviewExist, setReviewsExist] = useState(false)


    const reviewExitHandler = () => {
        setReviewsExist(true)
    }

    const uploadReviews = async (rev) => {
        try {
            const docRef = doc(db, 'herbsReviews', reviewedHerb)
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data().reviews
            const index = docData.findIndex(ob => ob.user === rev.user)
            if (index !== -1) {
                docData.splice(index, 1, rev)
            } else {
                docData.push(rev)
                reviewExitHandler()
            }
            await updateDoc(docRef, {
                reviews: docData
            })
            const newDocSnap = await getDoc(docRef);
            setDownloadedReviews(newDocSnap.data().reviews)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const downloadReviews = async () => {
            try {
                const docRef = doc(db, 'herbsReviews', reviewedHerb)
                const docSnap = await getDoc(docRef);
                setDownloadedReviews(docSnap.data().reviews)
                const docData = docSnap.data().reviews
                const index = docData.findIndex(ob => ob.user === currentUser)
                if (index !== -1) {
                    reviewExitHandler()
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        downloadReviews()
    }, [reviewedHerb, currentUser])

    return (
        <Modal onClick={props.onToggleReviewsHandler}>
            <div className="flex flex-col">
                <h1 className="mb-2 font-medium">{reviewedHerb}</h1>
                <ul className="overflow-auto max-h-64">
                    {downloadedReviews.map((rev) => (
                        <Review
                            key={rev.key}
                            time={rev.time}
                            name={rev.user}
                            review={rev.review}
                            rate={rev.rate}
                        />
                    ))}
                </ul>
                <ReviewInput
                    onToggleReviewsHandler={props.onToggleReviewsHandler}
                    onToggleUserToolsHandler={props.onToggleUserToolsHandler}
                    uploadReviews={uploadReviews}
                    reviewExist={reviewExist}
                />
            </div>
        </Modal>
    )
}
export default Reviews