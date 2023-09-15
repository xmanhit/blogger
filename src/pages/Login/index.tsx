import { connect } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { ILoginProps } from '../../models'
import { loginRequest } from '../../store/slices/auth.slice'
import SignInForm from '../../components/form/SignInForm'
import { useEffect } from 'react'

export const loginLoader = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return redirect('/')
  }
  return null
}

const Login: React.FC<ILoginProps> = ({
  isLoading,
  isAuthenticated,
  isActionLoading,
  loginRequest,
  errors,
}) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])
  console.log(isAuthenticated, isLoading)

  if (isLoading || isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>Login</h2>
      <Link to='/register'>Need an account?</Link>
      <SignInForm
        loginRequest={loginRequest}
        isActionLoading={isActionLoading}
        errors={errors}
      />
    </>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    isActionLoading: state.auth.isActionLoading,
    errors: state.auth.errors,
  }),
  {
    loginRequest,
  }
)(Login)
