import { useSelector } from "react-redux";
const SearchInfoMsg = (props) => {
    console.log('SearchInfoMsg');
    let message

    const quantOfFindedHerbs = useSelector(state => state.searchHerbs.filterHerbs)

    if (quantOfFindedHerbs.length === 0) {
        message = 'Niema takiego towaru'
    } else {
        props.onClick()
    }

    return (
        <div className="text-[#B81426] pt-2 text-center">{message}</div>
    )
}
export default SearchInfoMsg