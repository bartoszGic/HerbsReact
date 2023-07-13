

const Review = (props) => {

    return (
        <li className="mb-4 break-words">
            <h3 className="text-xs mb-1 text-gray-400">{props.name}</h3>
            <p className="text-xs mx-2 text-gray-700 text-justify">{props.review}</p>
        </li>
    )
}
export default Review