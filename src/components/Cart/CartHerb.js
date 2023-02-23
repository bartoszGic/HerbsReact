import styles from '../../CSS/CartHerb.module.css'

const CartHerb = (props) => {
    const price = props.price.toFixed(2)
    return (
        <li className={styles.cartHerb}>
            <p className={styles.cartHerbName}>{props.name}</p>
            <p className={styles.cartHerbWeight}>{`${props.weight}g x ${props.counter}`}</p>
            <p className={styles.cartHerbPrice}>{`${price} zł`}</p>
            <div className={styles.quantBtns}>
                <button className={styles.addBtn} onClick={props.onAdd}>+</button>
                <button className={styles.removeBtn} onClick={props.onRemove}>-</button>
            </div>
        </li>
    )
}
export default CartHerb