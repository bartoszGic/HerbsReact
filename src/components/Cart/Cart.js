import styles from '../../CSS/Cart.module.css'
import Modal from '../UI/Modal'

const Cart = (props) => {

    const cartItems = (<ul className={styles.cartItems}>
        {[{ id: 'h1', name: 'Basil', amount: 2, price: '10zł' }].map((item) => (
            <li>{item.name}</li>
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