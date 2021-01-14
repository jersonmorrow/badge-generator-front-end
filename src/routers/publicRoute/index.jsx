import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Axios from 'axios';

const PublicRoute = ({ component: Component, ...rest }) => {
  // const isAuthenticated = async () => {
  //   let user = localStorage.getItem('user');
  //   if (user) {
  //     const validateUser = await Axios.post(
  //       'http://localhost:5000/users/tokenIsValid',
  //       null,
  //       { withCredentials: true }
  //     );
  //     return validateUser;
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
        if (!isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/events" />;
        }
      }}
    />
  );
};

export default PublicRoute;
