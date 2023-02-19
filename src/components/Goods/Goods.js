import HerbsList from "./HerbsList"
import Welcome from "./Welcome"
import styles from '../../CSS/Goods.module.css'

const Goods = () => {
    return (
        <main className={styles.main}>
            <Welcome />
            <HerbsList />
        </main>
    )
}

export default Goods