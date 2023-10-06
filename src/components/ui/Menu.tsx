import { connect } from 'react-redux'
import styles from '../../styles/Header.module.css'
import { currentUser } from '../../services'
import { Link } from 'react-router-dom'
import { IUser } from '../../models'

interface IMenuProps {
  user: IUser | null
  isActive: boolean
  setActive: any
}

const Menu: React.FC<IMenuProps> = ({ user, isActive, setActive }) => {
  return (
    <div className={`${styles.menuWrapper} ${isActive ? styles.active : ''}`}>
      <div className={styles.menu}>
        <div className={styles.container}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link onClick={() => setActive(false)} to='/me' className={`${styles.link} ${styles.user}`}>
                <strong className={styles.username}>{user?.username}</strong>
                <small className={styles.email}>{user?.email}</small>
              </Link>
            </li>
            <li className={styles.itemHr}>
              <hr className={styles.hr} />
            </li>
            <li className={styles.item}>
              <Link onClick={() => setActive(false)} to='/new' className={styles.link}>
                Create Post
              </Link>
            </li>
            <li className={styles.item}>
              <Link onClick={() => setActive(false)} to='/me/settings' className={styles.link}>
                Settings
              </Link>
            </li>
            <li className={styles.itemHr}>
              <hr className={styles.hr} />
            </li>
            <li className={styles.item}>
              <Link onClick={() => setActive(false)} to='/me/signout' className={styles.link}>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({
  user: currentUser(),
}))(Menu)
