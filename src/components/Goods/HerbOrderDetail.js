import styles from '../../CSS/HerbOrderDetail.module.css'
import { useRef, useState } from 'react'

const HerbOrderDetail = (props) => {

    const refWeight = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const dropDownToggler = () => setIsOpen(!isOpen)

    // const changeValueHandl = (e) => {
    //     props.onWeightChange(e.target.value)
    // }
    const addHandl = () => {
        const weight = refWeight.current.value;
        const weightNum = +weight
        props.onAdd(weightNum)
    }
    return (
        <div className={styles.select}>
            {/* <select name="amount" id="amount" className={styles.amount}
                ref={refWeight}
                onChange={changeValueHandl}>
                <option value="10">10g</option>
                <option value="50">50g</option>
                <option value="100">100g</option>
            </select> */}
            <div className={styles.dropDownHeader} onClick={dropDownToggler}>10g</div>
            {isOpen && (
                <ul className={styles.amount}
                    ref={refWeight}>
                    <li value="10"><button>10g</button></li>
                    <li value="50">50g</li>
                    <li value="100">100g</li>
                </ul>
            )}

            <button className={styles.addToCartBtn} onClick={addHandl}>Add</button>
        </div>
    )
}
export default HerbOrderDetail