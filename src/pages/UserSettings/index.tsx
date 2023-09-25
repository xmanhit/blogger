import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { currentUserRequest, updateRequest } from '../../store/slices/auth.slice'
import { currentUser } from '../../services'
import { IUserSettingProps } from '../../models'
import styles from '../../styles/User.module.css'

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

  const handleUpdateClick = (e) => {
    e.preventDefault()
    user && updateRequest({ user: updatedUser })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          image: reader.result,
        }))
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <form className={styles.userSettingForm}>
      <div className={styles.userSetting}>
        <h2>User</h2>
        <div className={styles.userSettingField}>
          <label className={styles.labelSetting}>Name</label>
          <input maxLength={30} className={styles.inputSetting} onChange={handleInputChange} placeholder="John Doe" value={updatedUser.username} size={30} type="text" name="username" id="username" />
        </div>
        <div className={styles.userSettingField}>
          <label className={styles.labelSetting}>Email</label>
          <input maxLength={50} className={styles.inputSetting} onChange={handleInputChange} placeholder="john.doe@example.com" value={updatedUser.email} size={50} type="text" name="email" id="email" />
        </div>
        <div className={styles.userSettingField}>
          <label className={styles.labelSetting}>Password</label>
          <input maxLength={30} className={styles.inputSetting} onChange={handleInputChange} placeholder="Password" value={updatedUser.password} size={30} type="text" name="password" id="password" />
        </div>
        <div className={styles.userSettingField}>
          <label className={styles.labelSetting}>Bio</label>
          <input maxLength={30} className={styles.inputSetting} onChange={handleInputChange} placeholder="Bio" value={updatedUser.bio} size={200} type="text" name="bio" id="bio" />
        </div>
        <div className={styles.userSettingField}>
          <label className={styles.labelSetting}>Profile image</label>
          <div className={styles.userAvatarRowSetting}>
            <span className={styles.userAvatarSetting}>
              <img alt="anhnlv119 profile image" src={updatedUser.image} className={styles.imgSetting} loading="lazy" />
            </span>
            <input accept="image/*" type="file" name='image' onChange={handleImageChange} />
          </div>
        </div>
        <div className={styles.userSettingField}>
          <button onClick={handleUpdateClick} className={styles.buttonSetting}>
            Submit to update
          </button>
        </div>
      </div>
    </form>

  )
}

export default connect(
  () => ({
    user: currentUser(),
  }),
  { currentUserRequest, updateRequest }
)(UserSetting)
