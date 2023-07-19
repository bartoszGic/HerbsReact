

const Review = (props) => {

    return (
        <li className="mb-4 break-words">
            <div className="flex">
                <h3 className="text-xs mb-1 text-gray-400">{props.name}</h3>
                {props.rate !== null
                    &&
                    <div className="flex ml-2">
                        {[...Array(props.rate)].map((star, i) => {
                            const ratingValue = 5 - i
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill='#eab308' viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="w-4 h-4 text-yellow-500" key={ratingValue}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>

                            )
                        })}
                    </div>}

            </div>
            <p className="text-xs mx-2 text-gray-700 text-justify">{props.review}</p>
        </li>
    )
}
export default Review