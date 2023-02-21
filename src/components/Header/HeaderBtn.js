import styles from '../../CSS/HeaderBtn.module.css'
import { useContext } from 'react'
import CartContext from '../store/cart-context'

const HeaderBtn = (props) => {
    const cartCtx = useContext(CartContext)
    const sumCartHerbs = cartCtx.herbs.reduce((curNum, herb) => {
        return curNum + herb.weight / herb.weight
    }, 0)

    console.log(typeof sumCartHerbs);
    return (
        <button className={styles.headerBtn} onClick={props.onClick}>
            <span>
                <i className="fa-solid fa-cart-shopping"></i>
            </span>
            <span className={styles.numHerbs}>
                <p>{sumCartHerbs}</p>
            </span>
        </button>
    )
}

export default HeaderBtn