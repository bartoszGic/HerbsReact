import CartBtn from './CartBtn'
import LogBtn from './LogBtn'
import SearchBtn from './SearchBtn'

const Header = (props) => {
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
                        onClick={props.onShowUserSignInUp} />
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