import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to='/'>Logo</Link>
      <Link to='/new'>Write</Link>
      <span>Avatar</span>
    </nav>
  );
};

export default Header;
