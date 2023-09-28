import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/NotFound.module.css'
import NotFoundIcon from '../assets/notfound.svg'

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Blogger | 404'
  }, [])

  return (
    <main>
      <div className={styles.notfound}>
        <div className={styles.image}>
          <NotFoundIcon />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.status}>404</h1>
            <h2 className={styles.title}>UH OH! You're lost.</h2>
            <p>
              The page you are looking for does not exist. How you got here is a mystery. But you can click the button
              below to go back to the homepage.
            </p>
          </div>
          <Link to={'/'} className={styles.link}>
            HOME
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
