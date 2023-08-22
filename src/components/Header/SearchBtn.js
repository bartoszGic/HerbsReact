import { useSelector } from "react-redux";
const SearchBtn = (props) => {
    let loupeColor
    const stateOfInput = useSelector(state => state.inputValue.inputValue)
    const allHerbs = useSelector(state => state.searchHerbs.storeHerbs)
    const filtredHerbs = useSelector(state => state.searchHerbs.filterHerbs)

    stateOfInput.trim() === '' ? loupeColor = 'text-white' : loupeColor = 'text-[#B81426]'

    if (allHerbs.length !== filtredHerbs.length) loupeColor = 'text-[#B81426]'

    return (
        <button className='flex group items-center bg-teal-400 rounded-2xl mr-2 py-1 px-2 opacity-80 transition duration-200 hover:shadow-none hover:opacity-100 max-sm:focus:opacity-100'
            onClick={props.onClick}
        >
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${loupeColor}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
        </button >
    )
}
export default SearchBtn

