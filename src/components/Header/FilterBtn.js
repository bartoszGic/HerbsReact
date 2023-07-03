import { useDispatch, useSelector } from "react-redux"
import { storeHerbsActions } from "../store/storedHerbs-slice"

const FilterBtn = (props) => {
    console.log('FilterBtn');
    const dispatch = useDispatch()
    const allHerbs = useSelector(state => state.searchHerbs.storeHerbs)

    // const returnToAllHerbs = () => {
    //     dispatch(storeHerbsActions.loadDownloadedHerbs(allHerbs))
    // }
    return (
        <button className='flex group items-center bg-[#B81426] rounded-2xl py-1 px-1 opacity-80 transition duration-200 hover:shadow-none hover:opacity-100 max-sm:focus:opacity-100'
            onClick={props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
        </button>
    )
}
export default FilterBtn