import { useEffect, useRef, useState } from "react"

const ReviewInputRating = (props) => {

    const [rating, setRating] = useState(null)
    const [reviewAdded, setReviewAdded] = useState(false)
    const previousRating = useRef(null)
    let currentStartColor
    let btnText = ''
    let btnColor = ''

    if (props.reviewExist) {
        btnText = 'Change review'
        btnColor = 'bg-[#B81426]'
    } else {
        btnText = 'Add review'
        btnColor = 'bg-teal-500'
    }

    const setRatingHandler = (val) => {
        setReviewAdded(false)
        setRating(val)
        previousRating.current === val && setRating(null)
    }

    const addReviewHandler = (e) => {
        e.preventDefault()
        setReviewAdded(true)
        props.onAddReviewHandler()
    }

    useEffect(() => {
        previousRating.current = rating
        props.getRating(rating)
    }, [rating, props, reviewAdded])

    return (
        <div className="flex flex-row-reverse justify-between mt-4">
            <button onClick={(e) => addReviewHandler(e)} type="submit" className={`${btnColor} text-gray-50 rounded-xl px-3 py-1  transition duration-100 hover:opacity-90 active:animate-animeBtn`}>{btnText}</button>
            <div className="flex flex-row-reverse">
                {
                    [...Array(5)].map((star, i) => {
                        const ratingValue = 5 - i
                        currentStartColor = 'none'
                        if (ratingValue <= rating && !reviewAdded) {
                            currentStartColor = '#eab308'
                        }
                        return (
                            <svg xmlns="http://www.w3.org/2000/svg" fill={currentStartColor} viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="w-6 h-6 text-gray-400 cursor-pointer peer hover:fill-current peer-hover:fill-yellow-500 peer-hover:text-yellow-500 hover:text-yellow-500 transition duration-100" value={ratingValue} key={ratingValue} onClick={() => setRatingHandler(ratingValue)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        )
                    })
                }
            </div>
        </div >
    )
}
export default ReviewInputRating