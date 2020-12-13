import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <Link to="./">
        <h1>Header to do</h1>
      </Link>
    </div>
  );
}

export default NavBar;
