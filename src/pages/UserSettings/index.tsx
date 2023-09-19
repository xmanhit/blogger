import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  currentUserRequest,
  updateRequest,
} from '../../store/slices/auth.slice'

const UserSetting: React.FC<any> = ({
  user,
  currentUserRequest,
  updateRequest,
  isAuthenticated,
}): JSX.Element => {
  const [updatedUser, setUpdatedUser] = useState({
    email: user?.email || '',
    password: '',
    username: user?.username || '',
    bio: user?.bio || '',
    image: user?.image || '',
  })

  useEffect(() => {
    currentUserRequest()
  }, [])

  useEffect(() => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      email: user?.email || '',
      password: '',
      username: user?.username || '',
      bio: user?.bio || '',
      image: user?.image || '',
    }))
  }, [user])
  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleUpdateClick = () => {
    updateRequest(updatedUser)
  }
  console.log(updatedUser, isAuthenticated)

  console.log('User:', user)

  return (
    <>
      <div>User Setting</div>
      <h1>ABC</h1>

      <>
        <input
          type='text'
          name='image'
          value={updatedUser.image}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='username'
          value={updatedUser.username}
          onChange={handleInputChange}
        />
        <textarea
          name='bio'
          cols={30}
          rows={10}
          value={updatedUser.bio}
          onChange={handleInputChange}
        ></textarea>
        <input
          type='email'
          name='email'
          value={updatedUser.email}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='password'
          value={updatedUser.password}
          onChange={handleInputChange}
        />

        <button onClick={handleUpdateClick}>Submit to update</button>
      </>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  }),
  { currentUserRequest, updateRequest }
)(UserSetting)
