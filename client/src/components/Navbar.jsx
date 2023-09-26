import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="navbar">
      <div className="container">
        <h1 className="logo"><Link to="/" className='link'>MyBlog</Link></h1>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>Art</h6>
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>Health</h6>
          </Link>
          <Link className="link" to="/?cat=dev">
            <h6>Dev</h6>
          </Link>
          <Link className="link" to="/?cat=movie">
            <h6>Movie</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>Design</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>Food</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser
          ? <span onClick={handleLogout}>Logout</span>
          : <Link to='/login' className='link'>Login</Link>
          }
          <span>
            <Link className='link write' to='/write'>Add Post</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar
