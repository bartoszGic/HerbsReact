import styles from '../../CSS/Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'
import { useContext } from 'react'
import CartHerb from './CartHerb'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const total = cartCtx.sumTotal.toFixed(2)
    const hasHerbs = cartCtx.herbs.length > 0

    const herbAddHandl = (herb) => {
        cartCtx.addHerb(herb)
    }

    const herbRemoveHandl = (id) => {
        cartCtx.removeHerb(id)
    }

    const cartHerbs = (
        <ul className={styles.cartHerbs}>
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
            {cartHerbs}
            <div className={styles.buttons}>
                <button className={styles.closeBtn} onClick={props.onHideCart}>Close</button>
                {hasHerbs && <button className={styles.orderBtn}>Order</button>}
            </div>
        </Modal>
    )
}
export default Cart