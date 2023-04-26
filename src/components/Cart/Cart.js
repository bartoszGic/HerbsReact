import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal'
// import CartContext from '../store/cart-context'
// import { useContext } from 'react'
// import CartHerb from './CartHerb'
import { herbsActions } from '../store/herbs-slice'

const Cart = (props) => {

    const dispatch = useDispatch()
    // const cartCtx = useContext(CartContext)
    const total = useSelector(state => state.cartHerbs.sumTotal.toFixed(2))
    const hasHerbs = dispatch.herbs.length > 0

    const herbAddHandl = (herb) => {
        dispatch(herbsActions.addToCart(herb))
    }

    // const herbRemoveHandl = (id) => {
    //     cartCtx.removeHerb(id)
    // }

    // const cartHerbs = (
    //     <ul className='overflow-auto max-h-96 divide-y'>
    //         {cartCtx.herbs.map((herb) => (
    //             <CartHerb
    //                 key={herb.id}
    //                 name={herb.name}
    //                 weight={herb.weight}
    //                 price={herb.price}
    //                 counter={herb.counter}
    //                 // onRemove={() => herbRemoveHandl(herb.id)}
    //                 onAdd={() => herbAddHandl(herb)}
    //                 img={herb.img}
    //             />
    //         ))}
    //     </ul>
    // )



    return (
        <Modal onClick={props.onHideCart}>
            <div className='text-center font-medium text-xl'>Cart</div>
            {cartHerbs}
            <div
                className='flex font-medium justify-center mt-2'>
                <div>Total: {`${total} zł`}</div>
            </div>
            <div
                className={`flex mt-2 ${!hasHerbs ? 'justify-center' : 'justify-between'}`}>
                <button
                    className='bg-teal-500 text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'
                    onClick={props.onHideCart}>Close</button>
                {hasHerbs &&
                    <button className='ml-4 bg-[#B81426] text-gray-50 rounded-xl px-3 py-1 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Order</button>}
            </div>
        </Modal>
    )
}
export default Cart