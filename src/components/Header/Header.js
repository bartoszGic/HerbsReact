import HeaderBtn from './HeaderBtn'

const Header = (props) => {
    return (
        <header className='fixed bg-teal-500 text-white w-full'>
            <section className='flex justify-between max-w-4xl mx-auto items-center p-2'>
                <h1 className='text-2xl'>HerbsReact</h1>
                <HeaderBtn onClick={props.onShowCart} />
            </section>
        </header>
    )
}

export default Header