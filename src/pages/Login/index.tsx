import { connect } from 'react-redux'
import { Link, LoaderFunction, redirect, useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { ILoginProps } from '../../models'
import SignInForm from '../../components/form/SignInForm'
import { useEffect } from 'react'
import { clearRegister } from '../../store/slices/auth.slice'

export const loginLoader: LoaderFunction = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return redirect('/')
  }
  return null
}

const Login: React.FC<ILoginProps> = ({ isAuthenticated, clearRegister }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <>
      <h2>Login</h2>
      <Link onClick={() => clearRegister()} to='/register'>
        Need an account?
      </Link>
      <SignInForm />
    </>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  { clearRegister }
)(Login)
