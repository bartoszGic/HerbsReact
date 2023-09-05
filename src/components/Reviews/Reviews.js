import Modal from "../UI/Modal"
import { useSelector } from "react-redux"
import ReviewInput from "./ReviewInput"
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Review from "./Review";
import { onAuthStateChanged } from "firebase/auth";


const Reviews = (props) => {
    const reviewedHerb = useSelector(state => state.modalContent.reviewedHerb)
    const [downloadedReviews, setDownloadedReviews] = useState([])
    const [reviewExist, setReviewsExist] = useState(false)
    const [ratingAverage, setRatingAverage] = useState(0)
    const [currentUserName, setCurrentUserName] = useState(0)

    let rating

    !isNaN(ratingAverage) ? rating = ratingAverage : rating = '-'

    const reviewExitHandler = () => {
        setReviewsExist(true)
    }

    const countAverage = (inputArray, numOfReviews) => {
        const sum = inputArray.reduce((rate, review) => rate + review.rate, 0)
        const average = sum / numOfReviews
        if (average % 1 === 0) {
            return average
        } else {
            return average.toFixed(1)
        }
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
            const newReviewsArray = newDocSnap.data().reviews
            setRatingAverage(countAverage(newReviewsArray, newReviewsArray.length))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserName(user.email.substring(0, user.email.indexOf('@')))
                const downloadReviews = async () => {
                    try {
                        const docRef = doc(db, 'herbsReviews', reviewedHerb)
                        const docSnap = await getDoc(docRef);
                        setDownloadedReviews(docSnap.data().reviews)
                        const docData = docSnap.data().reviews
                        setRatingAverage(countAverage(docData, docData.length))
                        if (currentUserName !== '') {
                            const index = docData.findIndex(ob => ob.user === currentUserName)
                            if (index !== -1) {
                                reviewExitHandler()
                            }
                        }
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
                downloadReviews()
            } else {
                setCurrentUserName('')
            }
        })
    }, [reviewedHerb, currentUserName])

    return (
        <Modal onClick={props.onToggleReviewsHandler}>
            <div className="flex flex-col">
                <h1 className="flex items-center mb-2 font-medium">{reviewedHerb}
                    <span className="ml-2 font-normal text-gray-500">{rating}/5</span>
                    <span className='inline-block align-middle'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#eab308" viewBox="0 0 24 24" strokeWidth="1" stroke="#eab308" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                </h1>
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