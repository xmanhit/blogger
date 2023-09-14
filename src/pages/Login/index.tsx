import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ILoginProps } from '../../models'
import { RootState } from '../../store'
import {
  /*currentUserRequest,*/ loginRequest,
} from '../../store/slices/auth.slice'
import SignInForm from '../../components/form/SignInForm'

const Login: React.FC<ILoginProps> = ({
  isLoading,
  isActionLoading,
  isAuthenticated,
  // currentUserRequest,
  loginRequest,
  errors,
}) => {
  const navigate = useNavigate()
  // useEffect(() => {
  //   currentUserRequest()
  // }, [])

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Login</h1>
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
    isActionLoading: state.auth.isActionLoading,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
  }),
  {
    loginRequest,
    // currentUserRequest,
  }
)(Login)
