import styles from '../../CSS/HerbsList.module.css'
import Herb from './Herb'
import herbsPics from '../../herbsPics/herbsPics'

const HERBS = [
    {
        id: 'h1',
        name: 'Basil',
        price1: 5,
        price2: 20,
        price3: 40,
        img: herbsPics.basil

    },
    {
        id: 'h2',
        name: 'Cilantro',
        price1: 4.5,
        price2: 18,
        price3: 36,
        img: herbsPics.cilantro
    },
    {
        id: 'h3',
        name: 'Dill',
        price1: 3,
        price2: 12,
        price3: 25,
        img: herbsPics.dill

    },
    {
        id: 'h4',
        name: 'Lavender',
        price1: 6,
        price2: 25,
        price3: 50,
        img: herbsPics.lavender

    },
    {
        id: 'h5',
        name: "St. John's wort",
        price1: 9,
        price2: 40,
        price3: 75,
        img: herbsPics.johannis

    },
    {
        id: 'h6',
        name: 'Mint',
        price1: 7,
        price2: 30,
        price3: 60,
        img: herbsPics.mint

    },
    {
        id: 'h7',
        name: 'Oregano',
        price1: 3,
        price2: 12,
        price3: 25,
        img: herbsPics.oregano

    }
]

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