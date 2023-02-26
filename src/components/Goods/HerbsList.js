import styles from '../../CSS/HerbsList.module.css'
import Herb from './Herb'
import HERBS from '../../herbsPics/herbsPics'



const HerbsList = () => {
    const herbsToBuy = HERBS.map(herb =>
        <Herb
            key={herb.id}
            id={herb.id}
            name={herb.name}
            price1={herb.price1}
            price2={herb.price2}
            price3={herb.price3}
            img={herb.img}
        />
    )
    return (
        <section className={styles.herbsList}>
            <ul>
                {herbsToBuy}
            </ul>
        </section>
    )
}
export default HerbsList