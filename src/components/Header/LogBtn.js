import { useSelector } from "react-redux"
const LogBtn = (props) => {
    let userColor
    const userState = useSelector(state => state.modalContent.logState)
    if (userState === true) {
        userColor = 'text-[#B81426]'
    } else {
        userColor = 'text-white'
    }
    return (
        <button className='flex group items-center bg-teal-400 rounded-2xl mr-2 py-1 px-1 opacity-80 transition duration-200 hover:shadow-none hover:opacity-100 max-sm:focus:opacity-100'
            onClick={props.onClick}
        >
            <span className='mx-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${userColor}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </span>
        </button>
    )
}
export default LogBtn