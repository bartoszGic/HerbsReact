import styles from '../../CSS/Herb.module.css'
import HerbOrderDetail from './HerbOrderDetail'
import { useState } from 'react'
const Herb = (props) => {
    const [price, setPrice] = useState(props.price1)
    const changeWeightHandl = (weight) => {
        if (weight === '10') {
            setPrice(props.price1)
        } else if (weight === '50') {
            setPrice(props.price2)
        } else if (weight === '100') {
            setPrice(props.price3)
        }
    }
    return (
        <li>
            <div className={styles.herb}>
                <div className={styles.herbImg}>
                    <img src={props.img} alt={props.name} />
                </div>
            </div>
            <div className={styles.description}>
                <h4 className={styles.name}>{props.name}</h4>
                <div className={styles.price}>{price}</div>
                <div className={styles.herbOrderDetail}>
                    <HerbOrderDetail onWeightChange={changeWeightHandl} />
                </div>
            </div>

        </li>
    )
}
export default Herb