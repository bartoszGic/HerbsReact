import styles from '../../CSS/Herb.module.css'
import HerbOrderDetail from './HerbOrderDetail'
const Herb = (props) => {
    return (
        <li>
            <div className={styles.herb}>
                <div className={styles.herbImg}>
                    <img src={props.img} alt={props.name} />
                </div>
                <div className={styles.description}>
                    <h4 className={styles.name}>{props.name}</h4>
                    <div className={styles.price}>{props.price}</div>
                    <div className={styles.herbOrderDetail}>
                        <HerbOrderDetail />
                    </div>
                </div>
            </div>
        </li>
    )
}
export default Herb