import styles from '../../CSS/HerbsList.module.css'
import Herb from './Herb'
import herbsPics from '../../herbsPics/herbsPics'

const HERBS = [
    {
        id: 'h1',
        name: 'Basil',
        price1: '5 zł',
        price2: '20 zł',
        price3: '40 zł',
        img: herbsPics.basil

    },
    {
        id: 'h2',
        name: 'Cilantro',
        price1: '4,5 zł',
        price2: '18 zł',
        price3: '36 zł',
        img: herbsPics.cilantro
    },
    {
        id: 'h3',
        name: 'Dill',
        price1: '3 zł',
        price2: '12 zł',
        price3: '25 zł',
        img: herbsPics.dill

    },
    {
        id: 'h4',
        name: 'Lavender',
        price1: '6 zł',
        price2: '25 zł',
        price3: '50 zł',
        img: herbsPics.lavender

    },
    {
        id: 'h5',
        name: "St. John's wort",
        price1: '9 zł',
        price2: '40 zł',
        price3: '75 zł',
        img: herbsPics.johannis

    },
    {
        id: 'h6',
        name: 'Mint',
        price1: '7 zł',
        price2: '30 zł',
        price3: '60 zł',
        img: herbsPics.mint

    },
    {
        id: 'h7',
        name: 'Oregano',
        price1: '3 zł',
        price2: '12 zł',
        price3: '25 zł',
        img: herbsPics.oregano

    }
]

const HerbsList = () => {
    const herbsToBuy = HERBS.map(herb =>
        <Herb
            key={herb.id}
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