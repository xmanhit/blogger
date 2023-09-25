import styles from '../styles/Global.module.css'
import { FaGithubAlt } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <a className={styles.link} href='https://github.com/xmanhit/blogger'>
          <FaGithubAlt className={styles.icon} />
          <span className={styles.text}>Fork on Github</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
