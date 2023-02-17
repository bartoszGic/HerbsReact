import styles from '../../CSS/HeaderBtn.module.css'
const HeaderBtn = () => {
    return (
        <button className={styles.headerBtn}>
            <span>
                <i class="fa-solid fa-cart-shopping"></i>
            </span>
            <span className={styles.numItems}>
                <p>4</p>
            </span>
        </button>
    )
}

export default HeaderBtn