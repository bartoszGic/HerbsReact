// import styles from '../../CSS/Goods.module.css'
import { Fragment } from "react"
import HerbsList from "./HerbsList"
import Welcome from "./Welcome"
import styles from '../../CSS/Goods.module.css'

const Goods = () => {
    return (
        <Fragment>
            <main>
                <Welcome />
                <HerbsList />
            </main>
        </Fragment>
    )
}

export default Goods