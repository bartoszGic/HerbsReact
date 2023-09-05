import Modal from "../UI/Modal"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeHerbsActions } from "../store/storedHerbs-slice"
import { storeSearchInputActions } from "../store/storeInput-slice"

const SearchInput = (props) => {
    const stateOfInput = useSelector(state => state.inputValue.inputValue)
    const [inputValue, setinputValue] = useState(stateOfInput)

    const dispatch = useDispatch()

    const searchBtnHandler = (e) => {
        e.preventDefault()
        dispatch(storeHerbsActions.searchInDownloadedHerbs(inputValue));
        dispatch(storeSearchInputActions.loadInputValue(inputValue))
        props.onToggleSearchInputHandler()
    }


    return (
        <Modal onClick={props.onToggleSearchInputHandler}>
            <form className="flex justify-center" onSubmit={searchBtnHandler}>
                <input className="border py-2 px-3 text-gray-700 leading-tight rounded-xl w-4/6"
                    type="text"
                    id='searchingHerb'
                    placeholder="Find product..."
                    value={inputValue}
                    onChange={(e) => setinputValue(e.target.value)}
                />
                <button type="submit" className='ml-4 bg-[#B81426] text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Search</button>
            </form>
        </Modal>
    )
}
export default SearchInput