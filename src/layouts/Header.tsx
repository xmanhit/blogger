import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { IHeaderProps } from '../models'
import { currentUser, isAuthenticated } from '../services'
import { currentUserRequest } from '../store/slices/auth.slice'
import avatar from '../assets/avatar.jpg'
import Logo from '../assets/logo.svg'
import styles from '../styles/Global.module.css'
import Menu from '../components/ui/Menu'

const Header: React.FC<IHeaderProps> = ({ isAuthenticated, currentUserRequest, user }) => {
  const [isActive, setActive] = useState(false)
  useEffect(() => {
    if (isAuthenticated && !user) {
      currentUserRequest()
    }
  }, [])

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setActive(!isActive)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <Link className={`${styles.logo} ${styles.navLink}`} to='/' aria-label='logo'>
            <Logo />
          </Link>
          <ul className={styles.navList}>
            {isAuthenticated ? (
              <>
                <li className={styles.navItem}>
                  <Link className={`${styles.navLink} ${styles.button}`} to='/new'>
                    Create Post
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link className={styles.navLink} onClick={handleToggleMenu} to='/me'>
                    <div className={styles.avatarWrapper}>
                      <span
                        style={{ backgroundImage: `url(${user?.image || avatar})` }}
                        className={styles.avatar}
                      ></span>
                    </div>
                  </Link>
                  <Menu isActive={isActive} />
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}>
                  <Link className={`${styles.navLink} ${styles.login}`} to='/login'>
                    Login
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link className={`${styles.navLink} ${styles.button}`} to='/register'>
                    Create account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default connect(
  () => ({
    isAuthenticated: isAuthenticated(),
    user: currentUser(),
  }),
  { currentUserRequest }
)(Header)
