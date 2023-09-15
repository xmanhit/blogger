import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import avatar from '../../assets/avatar.jpg'

const Header = ({ isAuthenticated, user }) => {
  if (isAuthenticated) {
    return (
      <nav>
        <Link to='/'>Logo</Link>
        <Link to='/new'>Write</Link>
        <span>
          <img
            style={{ width: '50px', height: '50px' }}
            src={user.image ? user.image : avatar}
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

export default connect((state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
}))(Header)
