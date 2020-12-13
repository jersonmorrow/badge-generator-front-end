import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import AuthOptions from '../../auth/authOptions';

function NavBar() {
  return (
    <div>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="./">
            <img src={logo} alt="logo" width="90" />
          </Link>
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
