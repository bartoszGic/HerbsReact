import Modal from "../UI/Modal"
import SearchInfoMsg from './SearchInfoMsg'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeHerbsActions } from "../store/storedHerbs-slice"
import { storeSearchInputActions } from "../store/storeInput-slice"

const SearchInput = (props) => {
    console.log('SearchInput');
    const quantOfFindedHerbs = useSelector(state => state.searchHerbs.filterHerbs)
    const stateOfInput = useSelector(state => state.inputValue.inputValue)
    const [msg, setMsg] = useState(null)
    const [inputValue, setinputValue] = useState(stateOfInput)

    const dispatch = useDispatch()

    const getInput = (e) => {
        setinputValue(e.target.value)
    }
    const searchBtnHandler = (e) => {
        e.preventDefault()
        dispatch(storeHerbsActions.searchInDownloadedHerbs(inputValue));
        dispatch(storeSearchInputActions.loadInputValue(inputValue))
        // setMsg(true)
    }

    useEffect(() => {
        if (quantOfFindedHerbs.length === 0) {
            setMsg(true)
        } else {
            setMsg(false)
        }
    }, [quantOfFindedHerbs])


    return (
        <Modal onClick={props.onHideSearchInput}>
            <form className="flex justify-center" onSubmit={searchBtnHandler}>
                <input className="appearance-none border py-2 px-3 text-gray-700 leading-tight rounded-xl w-4/6"
                    type="text"
                    id='searchingHerb'
                    placeholder="Find product..."
                    onChange={getInput}
                    value={inputValue}
                />
                <button type="submit" className='ml-4 bg-[#B81426] text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Search</button>
            </form>
            {msg && <SearchInfoMsg onClick={props.onHideSearchInput} />}
        </Modal>
    )
}
export default SearchInput