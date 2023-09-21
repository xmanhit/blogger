import { useEffect } from 'react'
import { Link, LoaderFunction, redirect, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { ILoginProps } from '../models'
import SignInForm from '../components/form/SignInForm'
import { clearRegister } from '../store/slices/auth.slice'
import { isAuthenticated } from '../services'
import Logo from '../assets/logo.svg'
import styles from '../styles/Global.module.css'
import { RootState } from '../store'

export const loginLoader: LoaderFunction = () => {
  if (isAuthenticated()) {
    return redirect('/')
  }
  return null
}

const Login: React.FC<ILoginProps> = ({ isAuthenticated, status, errors, clearRegister }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <div className={styles.container}>
      <section className={styles.auth}>
        {status === 'failed' && errors && (
          <div className={styles.errorResponse}>
            <strong className={styles.title}>Unable to login.</strong>
            <p className={styles.message}>
              If you haven't created an account, we recommend signing up with social authentication below.
            </p>
          </div>
        )}
        <Link to={'/'} className={styles.logo}>
          <Logo />
        </Link>
        <h1>Welcome back to Blogger Community</h1>
        <SignInForm />
        <p>
          New to Blogger Community?{' '}
          <Link className={styles.link} onClick={() => clearRegister()} to='/register'>
            Create account.
          </Link>
        </p>
      </section>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    status: state.auth.status.login,
    errors: state.auth.errors.login,
  }),
  { clearRegister }
)(Login)
