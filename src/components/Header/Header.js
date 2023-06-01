import CartBtn from './CartBtn'
import LogBtn from './LogBtn'
import SearchBtn from './SearchBtn'
import { auth } from '../../firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { modalsStatesActions } from '../store/modalsStates-slice'
import { useDispatch } from 'react-redux'

const Header = (props) => {
    // console.log('Header');
    const dispatch = useDispatch()
    onAuthStateChanged(auth, (user) => {
        user && dispatch(modalsStatesActions.trueLogState())
    });
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
                        onClick={props.onToggleUserToolsHandler} />
                    <SearchBtn
                        onClick={props.onToggleSearchInputHandler} />
                    <CartBtn
                        onClick={props.onToggleCartHandler} />
                </div>
            </section>
        </header >
    )
}

export default Header