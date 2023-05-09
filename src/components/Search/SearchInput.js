import Modal from "../UI/Modal"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeHerbsActions } from "../store/storedHerbs-slice"

const SearchInput = (props) => {
    console.log('SearchInput');
    const [inputValue, setinputValue] = useState('')
    const [error, setError] = useState(false)
    const quantOfFindedHerbs = useSelector(state => state.searchHerbs.filterHerbs)

    const dispatch = useDispatch()

    const getInput = (e) => {
        setinputValue(e.target.value)
    }
    const searchBtnHandler = (e) => {
        e.preventDefault()
        dispatch(storeHerbsActions.searchInDownloadedHerbs(inputValue));
        localStorage.setItem('searchValue', inputValue)
        console.log(typeof localStorage.getItem('searchValue'));
    }

    useEffect(() => {
        console.log('searchInput-Effect');
        if (typeof localStorage.getItem('searchValue') === 'string') {
            setinputValue(localStorage.getItem('searchValue'))
        };
        if (quantOfFindedHerbs.length === 0) {
            setError(true)
        } else {
            setError(false)
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
            {error && <div className="text-[#B81426] pt-2 text-center">Niema takiego towaru</div>}
        </Modal>
    )
}
export default SearchInput