import { useState } from 'react'
import { ISignInProps } from '../../models'

const SignInForm: React.FC<ISignInProps> = ({
  loginRequest,
  isActionLoading,
  errors,
}) => {
  const [email, setEmail] = useState('123test@gmail.com')
  const [password, setPassword] = useState('3534534')
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    loginRequest({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        email:
        <input type='text' value={email} onChange={handleEmailChange} />
        {errors.email && <span>Email {errors.email}</span>}
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <span>Password {errors.password}</span>}
      </label>
      <button disabled={isActionLoading} type='submit'>
        Login
      </button>
    </form>
  )
}

export default SignInForm
