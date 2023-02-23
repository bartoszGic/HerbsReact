import styles from '../../CSS/Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'
import { useContext } from 'react'
import CartHerb from './CartHerb'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const total = cartCtx.sumAmount.toFixed(2)
    const hasHerbs = cartCtx.herbs.length > 0

    const herbRemoveHandl = (id) => { }

    const herbAddHandl = (herb) => { }

    const cartItems = (
        <ul className={styles.cartItems}>
            {cartCtx.herbs.map((herb) => (
                <CartHerb
                    key={herb.id}
                    name={herb.name}
                    weight={herb.weight}
                    price={herb.price}
                    counter={herb.counter}
                    onRemove={() => herbRemoveHandl(herb.id)}
                    onAdd={() => herbAddHandl(herb)}
                />
            ))}
        </ul>
    )

    return (
        <Modal onClick={props.onHideCart}>
            <div className={styles.summary}>
                <span>Total: </span>
                <span>{`${total} zł`}</span>
            </div>
            {cartItems}
            <div className={styles.buttons}>
                <button className={styles.closeBtn} onClick={props.onHideCart}>Close</button>
                {hasHerbs && <button className={styles.orderBtn}>Order</button>}
            </div>
        </Modal>
    )
}
export default Cart