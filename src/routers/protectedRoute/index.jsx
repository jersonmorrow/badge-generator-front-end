import React from 'react';
// import Axios from 'axios';

import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const isAuthenticated = async () => {
  //   let user = localStorage.getItem('user');
  //   if (!user === null) {
  //     const validateUser = await Axios.post(
  //       'http://localhost:5000/users/tokenIsValid',
  //       null,
  //       { withCredentials: true }
  //     );
  //     return validateUser.data;
  //   } else {
  //     localStorage.clear();
  //     return false;
  //   }
  // };

  const isAuthenticated = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === true) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
