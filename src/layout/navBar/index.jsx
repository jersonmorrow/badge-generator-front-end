import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import AuthOptions from '../../features/auth/authOptions';
import UserContext from '../../context/userContext';

function NavBar() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/events">
            <img src={logo} alt="logo" width="90" />
          </Link>
        </div>

        <div className="navbar-end">
          {userData.user ? (
            <p>Wellcome {userData.user.name}</p>
          ) : (
            <p>Start Today</p>
          )}
          <div className="navbar-item">
            <AuthOptions />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
