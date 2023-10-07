import { useNavigate } from 'react-router-dom'
import styles from '../styles/Signout.module.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../store/slices/auth.slice'

const Signout: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Blogger | Sign Out'
  }, [])

  const handleSigout = () => {
    dispatch(logoutRequest())
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
