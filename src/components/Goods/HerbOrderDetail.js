import styles from '../../CSS/HerbOrderDetail.module.css'
import { Fragment } from 'react'
const HerbOrderDetail = () => {
    return (
        <Fragment>
            <div className={styles.select}>
                <select name="amount" id="amount">
                    <option value="10">10g</option>
                    <option value="50">50g</option>
                    <option value="100">100g</option>
                </select>
                <button>Add</button>
            </div>
        </Fragment>
    )
}
export default HerbOrderDetail