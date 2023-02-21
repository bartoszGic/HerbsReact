import styles from '../../CSS/Herb.module.css'
import HerbOrderDetail from './HerbOrderDetail'
import { useState } from 'react'
import { useContext } from 'react'
import CartContext from '../store/cart-context'

const Herb = (props) => {
    const [price, setPrice] = useState(props.price1)
    const cartCtx = useContext(CartContext)

    const changeWeightHandl = (weight) => {
        if (weight === '10') {
            setPrice(props.price1)
        } else if (weight === '50') {
            setPrice(props.price2)
        } else if (weight === '100') {
            setPrice(props.price3)
        }

    }


    const addToCartHandl = (weight) => {

        cartCtx.addHerb({
            id: props.id,
            name: props.name,
            weight: weight,
            price: price
        })
    }

    return (
        <li className={styles.herb}>
            <div className={styles.herbImgContainer}>
                <div className={styles.herbImg}>
                    <img src={props.img} alt={props.name} />
                </div>
            </div>
            <div className={styles.description}>
                <h4 className={styles.name}>{props.name}</h4>
                <div className={styles.price}>{price}</div>
                <div className={styles.herbOrderDetail}>
                    <HerbOrderDetail onAdd={addToCartHandl} onWeightChange={changeWeightHandl} />
                </div>
            </div>

        </li>
    )
}
export default Herb