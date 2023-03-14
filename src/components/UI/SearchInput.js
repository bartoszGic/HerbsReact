import Modal from "./Modal"
import { useRef } from "react"
import HERBS from '../../herbsDatas/herbsDatas'

const SearchInput = (props) => {

    const refSearch = useRef('')

    const searchHerbHandler = (e) => {
        e.preventDefault()

        const searchedHerb = refSearch.current.value

        props.onGetFilteredHerbs(searchedHerb, HERBS)
    }

    return (
        <Modal onClick={props.onHideSearchInput}>
            <form className="flex justify-center" onSubmit={searchHerbHandler}>
                <input className="appearance-none border py-2 px-3 text-gray-700 leading-tight rounded-xl w-4/6"
                    type="text"
                    id='searchingHerb'
                    placeholder="Find product..."
                    ref={refSearch}
                />
                <button type="submit" className='ml-4 bg-[#B81426] text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Search</button>
            </form>
        </Modal>
    )
}
export default SearchInput