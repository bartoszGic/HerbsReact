import styles from '../../CSS/HerbsList.module.css'
import Herb from './Herb'
import herbsPics from '../../herbsPics/herbsPics'

const HERBS = [
    {
        id: 'h1',
        name: 'Basil',
        price: '5 zł',
        img: herbsPics.basil

    },
    {
        id: 'h2',
        name: 'Cilantro',
        price: '4,5 zł',
        img: herbsPics.cilantro
    },
    {
        id: 'h3',
        name: 'Dill',
        price: '3 zł',
        img: herbsPics.dill

    },
    {
        id: 'h4',
        name: 'Lavender',
        price: '6 zł',
        img: herbsPics.lavender

    },
    {
        id: 'h5',
        name: "St. John's wort",
        price: '9 zł',
        img: herbsPics.johannis

    },
    {
        id: 'h6',
        name: 'Mint',
        price: '7 zł',
        img: herbsPics.mint

    },
    {
        id: 'h7',
        name: 'Oregano',
        price: '3 zł',
        img: herbsPics.oregano

    }
]

const HerbsList = () => {
    const herbsToBuy = HERBS.map(herb =>
        <Herb
            key={herb.id}
            name={herb.name}
            price={herb.price}
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