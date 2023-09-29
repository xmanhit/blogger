import { useEffect } from 'react'
import UserSettingForm from '../components/form/UserSettingForm'

const UserSetting: React.FC = () => {
  useEffect(() => {
    document.title = 'Blogger | Setting'
  }, [])

  return <UserSettingForm />
}

export default UserSetting
