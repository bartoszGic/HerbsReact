import Modal from "../UI/Modal"
import { useEffect, useState } from "react"

const SearchInput = (props) => {

    const [inputValue, setinputValue] = useState('')
    const [error, setError] = useState(false)

    const getInput = (e) => {
        setinputValue(e.target.value)
    }
    const searchBtnHandler = (e) => {
        e.preventDefault()
        localStorage.setItem('searchValue', inputValue)
        props.onFilterListHandler(filtredHerbs)
        inputValueValidation()
    }

    const inputValueValidation = () => {
        if (filtredHerbs.length === 0) {
            setError(true)
        } else {
            setError(false)
            props.onHideSearchInput()
        }

    }

    const filterHerbs = (input, herbs) => {
        if (input === '') {
            return herbs
        }
        return herbs.filter(herb => herb.name.toLowerCase().includes(input.toString().toLowerCase()))
    }

    const filtredHerbs = filterHerbs(inputValue, props.downloadedList)
    console.log(filtredHerbs);
    useEffect(() => {
        if (typeof localStorage.getItem('searchValue') === 'string') {
            setinputValue(localStorage.getItem('searchValue'))
        };
    }, [])


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