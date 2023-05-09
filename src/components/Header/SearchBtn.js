const SearchBtn = (props) => {
    let colorOfLoupe
    if (localStorage.getItem('searchValue') !== null) {
        const storedSearchInput = localStorage.getItem('searchValue');
        storedSearchInput.trim() !== '' ? colorOfLoupe = 'text-[#B81426]' : colorOfLoupe = 'text-white'
    } else {
        colorOfLoupe = 'text-white'
    }


    return (
        <button className='flex group items-center bg-teal-400 rounded-2xl mr-2 py-1 px-2 opacity-80 transition duration-200 hover:shadow-none hover:opacity-100 max-sm:focus:opacity-100'
            onClick={props.onClick}
        >
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${colorOfLoupe}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
        </button >
    )
}
export default SearchBtn

