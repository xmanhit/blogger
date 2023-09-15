import { useState } from 'react'
import { ISignUpProps } from '../../models'

const SignUpForm: React.FC<ISignUpProps> = ({
  registerRequest,
  isActionLoading,
  errors,
}) => {
  const [username, setUsername] = useState('123test')
  const [email, setEmail] = useState('123test@gmail.com')
  const [password, setPassword] = useState('123')

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    registerRequest({ username, email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type='text' value={username} onChange={handleUsernameChange} />
          {errors.username && <span>Username {errors.username}</span>}
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type='text' value={email} onChange={handleEmailChange} />
          {errors.email && <span>Email {errors.email}</span>}
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <span>Password {errors.password}</span>}
        </label>
      </div>
      <button disabled={isActionLoading} type='submit'>
        Register
      </button>
    </form>
  )
}

export default SignUpForm
