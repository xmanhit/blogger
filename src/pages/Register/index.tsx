import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IRegisterProps } from '../../models'
import { RootState } from '../../store'
import {
  // currentUserRequest,
  registerRequest,
} from '../../store/slices/auth.slice'
import SignUpForm from '../../components/form/SignUpForm'

const Register: React.FC<IRegisterProps> = ({
  isLoading,
  isActionLoading,
  // currentUserRequest,
  isAuthenticated,
  registerRequest,
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
      <div>Register</div>
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
    // currentUserRequest,
  }
)(Register)
