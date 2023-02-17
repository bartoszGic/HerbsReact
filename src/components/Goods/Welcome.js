import { Fragment } from 'react'
import styles from '../../CSS/Welcome.module.css'

const Welcome = () => {
    return (
        <Fragment>
            <div className={styles.welcomeBg}></div>
            <div className={styles.welcome}>
                <h3>Welcome in my shop!</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore placeat est pariatur in amet temporibus atque molestias, commodi aperiam veniam.</p>
            </div>
        </Fragment>
    )
}

export default Welcome