import styles from '../../CSS/HerbOrderDetail.module.css'
const HerbOrderDetail = (props) => {
    const changeValueHandl = (e) => {
        props.onWeightChange(e.target.value)
    }
    return (
        <div className={styles.select}>
            <select name="amount" id="amount" onChange={changeValueHandl}>
                <option value="10">10g</option>
                <option value="50">50g</option>
                <option value="100">100g</option>
            </select>
            <button>Add</button>
        </div>
    )
}
export default HerbOrderDetail