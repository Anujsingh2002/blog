import { useContext } from 'react';
import './TopBar.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <div className='top'>
      <div className="topLeft">
        <Link to='https://www.facebook.com/'> <i className="topIcon fa-brands fa-square-facebook"></i> </Link>
        <Link to='https://x.com/?lang=en'>  <i className="topIcon fa-brands fa-square-x-twitter"></i> </Link>
        <Link to='https://in.linkedin.com/'> <i className="topIcon fa-brands fa-linkedin"></i> </Link >
        <Link to='https://www.youtube.com/'> <i className="topIcon fa-brands fa-square-youtube"></i> </Link >
      </div >
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className='link' to="/" >HOME</Link>
          </li>
          <li className="topListItem">
            <Link className='link' to="/about" >About</Link>
          </li>
          <li className="topListItem">
            <Link className='link' to="/contact" >Contact</Link>
          </li>
          <li className="topListItem">
            <Link className='link' to="/write" >Write</Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>{user && "Logout"}</li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <Link to="/settings">
              <img
                className='topImage'
                src={PF + user.profilePic}
                alt="PP"
              />
            </Link>
          )
            : (
              <ul className="topList">
                <li className="topListItem">
                  <Link className='link' to="/login" >Login</Link>
                </li>
                <li className="topListItem">
                  <Link className='link' to="/register" >Register</Link>
                </li>
              </ul>


            )
        }

        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div >
  )
}
