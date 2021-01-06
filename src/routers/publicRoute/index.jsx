import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, user, ...rest }) => {
  const isAuthenticated = localStorage.getItem('auth-token');

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Redirect to="/events" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
