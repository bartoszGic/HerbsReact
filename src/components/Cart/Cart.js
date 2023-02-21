import styles from '../../CSS/Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'
import { useContext } from 'react'
import CartHerb from './CartHerb'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)

    const cartItems = (
        <ul className={styles.cartItems}>
            {cartCtx.herbs.map((herb) => (
                <CartHerb
                    name={herb.name}
                    weight={herb.weight}
                    price={herb.price}
                />
            ))}
        </ul>
    )

    return (
        <Modal onClick={props.onHideCart}>
            <div className={styles.summary}>
                <span>Total: </span>
                <span>34,5 zł</span>
            </div>
            {cartItems}
            <div className={styles.buttons}>
                <button className={styles.closeBtn} onClick={props.onHideCart}>Close</button>
                <button className={styles.orderBtn}>Order</button>
            </div>
        </Modal>
    )
}
export default Cart