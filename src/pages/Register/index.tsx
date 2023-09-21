import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, LoaderFunction, redirect, useNavigate } from 'react-router-dom'
import { IRegisterProps } from '../../models'
import SignUpForm from '../../components/form/SignUpForm'
import { clearLogin } from '../../store/slices/auth.slice'
import { isAuthenticated } from '../../services'

export const registerLoader: LoaderFunction = () => {
  if (isAuthenticated()) {
    return redirect('/')
  }
  return null
}

const Register: React.FC<IRegisterProps> = ({ isAuthenticated, clearLogin }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <>
      <h2>Register</h2>
      <Link onClick={() => clearLogin()} to='/login'>
        Have an account?
      </Link>
      <SignUpForm />
    </>
  )
}

export default connect(
  () => ({
    isAuthenticated: isAuthenticated(),
  }),
  { clearLogin }
)(Register)
