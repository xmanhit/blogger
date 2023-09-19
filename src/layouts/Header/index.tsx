import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import avatar from '../../assets/avatar.jpg'

const Header: React.FC<{
  isAuthenticated: boolean
  currentUserRequest: any
  user: any
}> = ({ isAuthenticated, currentUserRequest, user }) => {
  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
  }, [])

  if (isAuthenticated) {
    return (
      <nav>
        <Link to='/'>Logo</Link>
        <Link to='/new'>Write</Link>
        <span>
          <img
            style={{ width: '50px', height: '50px' }}
            src={user?.image ? user.image : avatar}
            alt='Logo'
          />
        </span>
      </nav>
    )
  }

  return (
    <nav>
      <Link to='/'>Logo</Link>
      <Link to='/new'>Write</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </nav>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }),
  { currentUserRequest }
)(Header)
