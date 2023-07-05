import { useDispatch } from "react-redux"
import { storeHerbsActions } from "../store/storedHerbs-slice"
import { useSelector } from "react-redux"
import { storeSearchInputActions } from "../store/storeInput-slice"

const ClearBtn = () => {
    const allHerbs = useSelector(state => state.searchHerbs.storeHerbs)
    const dispatch = useDispatch()
    const clearHerbsList = () => {
        dispatch(storeHerbsActions.loadDownloadedHerbs(allHerbs))
        dispatch(storeSearchInputActions.loadInputValue(''))
    }

    return (
        <button onClick={clearHerbsList} className='fixed bg-[#B81426]  text-gray-50 top-20 h-8 w-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl transition duration-100 hover:opacity-90  z-20'>Clear</button>
    )
}
export default ClearBtn