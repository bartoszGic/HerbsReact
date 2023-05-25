import CartBtn from './CartBtn'
import LogBtn from './LogBtn'
import SearchBtn from './SearchBtn'
import { useSelector } from 'react-redux'

const Header = (props) => {
    console.log('Header');
    const modalContent = useSelector(state => state.modalContent.panel)
    console.log(modalContent);
    const pageRefresher = () => {
        window.location.reload()
    }
    return (
        <header className='fixed bg-teal-500 text-white w-full'>
            <section className='flex justify-between max-w-4xl mx-auto items-center p-2'>
                <button onClick={pageRefresher}>
                    <h1 className='text-2xl'>HerbsReact</h1>
                </button>
                <div className='flex'>
                    <LogBtn
                        onClick={props.onShowUserTools} />
                    <SearchBtn
                        onClick={props.onShowSearchInput} />
                    <CartBtn
                        onClick={props.onShowCart} />
                </div>
            </section>
        </header >
    )
}

export default Header