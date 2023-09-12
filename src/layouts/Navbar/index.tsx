import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Logo</Link>
      <Link to='/me/new'>Write</Link>
      <button>profile</button>
    </nav>
  )
}

export default Navbar
