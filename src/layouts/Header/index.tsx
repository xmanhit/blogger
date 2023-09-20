import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { currentUserRequest } from '../../store/slices/auth.slice'
import avatar from '../../assets/avatar.jpg'
import { currentUser, isAuthenticated } from '../../services'
import { IHeaderProps } from '../../models'

const Header: React.FC<IHeaderProps> = ({ isAuthenticated, currentUserRequest, user }) => {
  useEffect(() => {
    if (isAuthenticated && !user) {
      currentUserRequest()
    }
  }, [])

  if (isAuthenticated) {
    return (
      <nav>
        <Link to='/'>Logo</Link>
        <Link to='/new'>Write</Link>
        <span>
          <Link to='/me'>
            <img style={{ width: '50px', height: '50px' }} src={user?.image ? user.image : avatar} alt='Logo' />
          </Link>
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
  () => ({
    isAuthenticated: isAuthenticated(),
    user: currentUser(),
  }),
  { currentUserRequest }
)(Header)
