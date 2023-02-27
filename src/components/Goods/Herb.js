import styles from '../../CSS/Herb.module.css'
import HerbOrderDetail from './HerbOrderDetail'
import { useState } from 'react'
import { useContext } from 'react'
import CartContext from '../store/cart-context'

const Herb = (props) => {
    const [price, setPrice] = useState(props.price1)
    const cartCtx = useContext(CartContext)
    const counter = 1

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
            id: props.id + weight,
            name: props.name,
            weight: weight,
            counter: counter,
            price: price
        })
    }


    return (
        <li className={styles.herb}>
            <div className={styles.herbImgContainer}>
                <img src={props.img} alt={props.name} />
            </div>
            <div className={styles.herbInfos}>
                <div className={styles.description}>
                    <h4 className={styles.name}>{props.name}</h4>
                    <div className={styles.price}>{`${price.toFixed(2)} `}<span>zł</span></div>
                </div>
                <HerbOrderDetail onAdd={addToCartHandl} onWeightChange={changeWeightHandl} />
            </div>
        </li>
    )
}
export default Herb