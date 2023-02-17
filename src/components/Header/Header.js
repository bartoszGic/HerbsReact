import styles from '../../CSS/Header.module.css'
import { Fragment } from 'react'
import HeaderBtn from './HeaderBtn'

const Header = () => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>HerbsReact</h1>
                <HeaderBtn />
            </header>
        </Fragment>
    )
}

export default Header