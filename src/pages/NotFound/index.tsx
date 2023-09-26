import { Link } from 'react-router-dom'
import styles from '../../styles/NotFound.module.css'
import NotFoundIcon from '../../assets/notfound.svg'

const NotFound: React.FC = () => {
  return (
    <main>
      <div className={styles.container}>
        <NotFoundIcon />
        <div className={styles.content}>
          <h1>404</h1>
          <h2>UH OH! You're lost.</h2>
          <p>
            The page you are looking for does not exist. How you got here is a mystery. But you can click the button
            below to go back to the homepage.
          </p>
        </div>
        <Link to={'/'} className={styles.link}>
          HOME
        </Link>
      </div>
    </main>
  )
}

export default NotFound
