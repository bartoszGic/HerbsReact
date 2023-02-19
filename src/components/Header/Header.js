import styles from '../../CSS/Header.module.css'
import HeaderBtn from './HeaderBtn'

const Header = (props) => {
    return (
        <header className={styles.header}>
            <h1>HerbsReact</h1>
            <HeaderBtn onClick={props.onShowCart} />
        </header>
    )
}

export default Header