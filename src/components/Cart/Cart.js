import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal'
import CartHerb from './CartHerb'
import { cartHerbsActions } from '../store/cartHerbs-slice'

const Cart = (props) => {
    const dispatch = useDispatch()
    const total = useSelector(state => state.cartHerbs.sumTotal.toFixed(2))
    const cartHerbs = useSelector(state => state.cartHerbs.herbs)
    const logState = useSelector(state => state.modalContent.logState)
    const hasHerbs = cartHerbs.length > 0

    const herbAddHandler = (herb) => {
        dispatch(cartHerbsActions.addToCart(herb))
    }
    const herbRemoveHandler = (id) => {
        dispatch(cartHerbsActions.removeFromCart(id))
    }
    const orderHandler = () => {
        if (!logState) {
            props.onToggleCartHandler()
            props.onOrderIfLogged()
        }
    }

    const addedToCartHerbs = (
        <ul className='overflow-auto max-h-96 divide-y'>
            {cartHerbs.map((herb) => (
                <CartHerb
                    key={herb.id}
                    name={herb.name}
                    weight={herb.weight}
                    price={herb.price}
                    counter={herb.counter}
                    onRemove={() => herbRemoveHandler(herb.id)}
                    onAdd={() => herbAddHandler(herb)}
                    img={herb.img}
                />
            ))}
        </ul>
    )

    return (
        <Modal onClick={props.onToggleCartHandler}>
            <h3 className='text-center font-medium text-xl'>Cart</h3>
            {addedToCartHerbs}
            <div
                className='flex font-medium justify-center mt-2'>
                <div>Total: {`${total} zł`}</div>
            </div>
            <div
                className={`flex mt-2 ${!hasHerbs ? 'justify-center' : 'justify-between'}`}>
                <button
                    className='bg-teal-500 text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'
                    onClick={props.onToggleCartHandler}>Close</button>
                {hasHerbs &&
                    <button className='ml-4 bg-[#B81426] text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'
                        onClick={orderHandler}>Order</button>}
            </div>
        </Modal>
    )
}
export default Cart