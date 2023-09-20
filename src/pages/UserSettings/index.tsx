import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { currentUserRequest, updateRequest } from '../../store/slices/auth.slice'
import { currentUser } from '../../services'
import { IUserSettingProps } from '../../models'

const UserSetting: React.FC<IUserSettingProps> = ({ user, currentUserRequest, updateRequest }): JSX.Element => {
  const [updatedUser, setUpdatedUser] = useState({
    email: user?.email || '',
    password: '',
    username: user?.username || '',
    bio: user?.bio || '',
    image: user?.image || '',
  })

  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
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
    user && updateRequest({ user: updatedUser })
  }

  return (
    <>
      <div>User Setting</div>
      <h1>ABC</h1>

      <>
        <input type='text' name='image' value={updatedUser.image} onChange={handleInputChange} />
        <input type='text' name='username' value={updatedUser.username} onChange={handleInputChange} />
        <textarea name='bio' cols={30} rows={10} value={updatedUser.bio} onChange={handleInputChange}></textarea>
        <input type='email' name='email' value={updatedUser.email} onChange={handleInputChange} />
        <input type='text' name='password' value={updatedUser.password} onChange={handleInputChange} />

        <button onClick={handleUpdateClick}>Submit to update</button>
      </>
    </>
  )
}

export default connect(
  () => ({
    user: currentUser(),
  }),
  { currentUserRequest, updateRequest }
)(UserSetting)
