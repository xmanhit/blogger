import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, LoaderFunction, redirect, useNavigate } from 'react-router-dom'
import { IRegisterProps } from '../models'
import SignUpForm from '../components/form/SignUpForm'
import { clearLogin } from '../store/slices/auth.slice'
import { isAuthenticated } from '../services'
import Logo from '../assets/logo.svg'
import styles from '../styles/Global.module.css'

export const registerLoader: LoaderFunction = () => {
  if (isAuthenticated()) {
    return redirect('/')
  }
  return null
}

const Register: React.FC<IRegisterProps> = ({ isAuthenticated, clearLogin }) => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Blogger | Register'
  }, [])

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <div className={styles.container}>
      <section className={styles.auth}>
        <Link to={'/'} className={styles.logo}>
          <Logo />
        </Link>
        <h1 className={styles.title}>Join the Blogger Community</h1>
        <SignUpForm />
        <p>
          Already have an account?{' '}
          <Link className={styles.link} onClick={() => clearLogin()} to='/login'>
            Log in.
          </Link>
        </p>
      </section>
    </div>
  )
}

export default connect(
  () => ({
    isAuthenticated: isAuthenticated(),
  }),
  { clearLogin }
)(Register)
