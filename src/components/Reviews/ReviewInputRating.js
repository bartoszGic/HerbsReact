import { useEffect, useRef, useState } from "react"



const ReviewInputRating = (props) => {
    const [rating, setRating] = useState(null)
    const previousRating = useRef(null)

    const test = (val) => {
        setRating(val)
        previousRating.current === val && setRating(null)
    }

    useEffect(() => {
        previousRating.current = rating
        props.getRating(rating)
    }, [rating, props])

    return (
        <div className="flex flex-row-reverse">
            {[...Array(5)].map((star, i) => {
                const ratingValue = 5 - i
                let currentColor = 'none'
                if (ratingValue <= rating) {
                    currentColor = '#eab308'
                }

                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill={currentColor} viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="w-6 h-6 text-gray-400 cursor-pointer peer hover:fill-current peer-hover:fill-yellow-500 peer-hover:text-yellow-500 hover:text-yellow-500 transition duration-100" value={ratingValue} key={ratingValue} onClick={() => test(ratingValue)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>

                )
            })}
        </div>
    )
}
export default ReviewInputRating