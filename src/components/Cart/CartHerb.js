import styles from '../../CSS/CartHerb.module.css'

const CartHerb = (props) => {
    return (
        <li className={styles.cartHerb}>
            <p className={styles.cartHerbName}>{props.name}</p>
            <p className={styles.cartHerbWeight}>{`${props.weight}g`}</p>
            <p className={styles.cartHerbPrice}>{props.price}</p>
        </li>
    )
}
export default CartHerb