import CartBtn from './CartBtn'
import SearchBtn from './SearchBtn'

const Header = (props) => {
    return (
        <header className='fixed bg-teal-500 text-white w-full'>
            <section className='flex justify-between max-w-4xl mx-auto items-center p-2'>
                <h1 className='text-2xl'>HerbsReact</h1>
                <div className='flex'>
                    <SearchBtn onClick={props.onShowSearchInput} />
                    <CartBtn onClick={props.onShowCart} />
                </div>
            </section>
        </header>
    )
}

export default Header