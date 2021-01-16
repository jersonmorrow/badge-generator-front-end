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
        <div className="navbar-brand pl-4">
          <Link to="/events">
            <img src={logo} alt="logo" width="70" />
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {userData.user ? (
              <p>Wellcome {userData.user.name}!</p>
            ) : (
              <p>Start Today</p>
            )}
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <AuthOptions />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
