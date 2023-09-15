import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { IRegisterProps } from '../../models'
import { RootState } from '../../store'
import {
  // currentUserRequest,
  registerRequest,
} from '../../store/slices/auth.slice'
import SignUpForm from '../../components/form/SignUpForm'

export const registerLoader = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return redirect('/')
  }
  return null
}

const Register: React.FC<IRegisterProps> = ({
  isLoading,
  isActionLoading,
  isAuthenticated,
  registerRequest,
  errors,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>Register</h2>
      <Link to='/login'>Have an account?</Link>
      <SignUpForm
        registerRequest={registerRequest}
        isActionLoading={isActionLoading}
        errors={errors}
      />
    </>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.auth.isLoading,
    isActionLoading: state.auth.isActionLoading,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
  }),
  {
    registerRequest,
  }
)(Register)
