import { useNavigate } from 'react-router-dom'
import { clearItem } from '../services'
import styles from '../styles/Signout.module.css'

const Signout: React.FC = () => {
  const navigate = useNavigate()
  const handleSigout = () => {
    clearItem('token')
    clearItem('currentUser')
    return navigate('/', { replace: true })
  }

  return (
    <section className={styles.signout}>
      <h1>Are you sure you want to sign out?</h1>
      <button type='button' className={styles.btnSignout} onClick={handleSigout}>
        Yes, Sign Out
      </button>
    </section>
  )
}

export default Signout
