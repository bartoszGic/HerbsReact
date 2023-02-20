import styles from '../../CSS/HerbOrderDetail.module.css'
import { useRef } from 'react'

const HerbOrderDetail = (props) => {

    const refAmount = useRef(null)

    const changeValueHandl = (e) => {
        props.onWeightChange(e.target.value)
    }
    const addHandl = () => {
        const weight = refAmount.current.value;
        const weightNum = +weight
        props.onAdd(weightNum)
    }
    return (
        <div className={styles.select}>
            <select name="amount" id="amount" ref={refAmount} onChange={changeValueHandl}>
                <option value="10">10g</option>
                <option value="50">50g</option>
                <option value="100">100g</option>
            </select>
            <button onClick={addHandl}>Add</button>
        </div>
    )
}
export default HerbOrderDetail