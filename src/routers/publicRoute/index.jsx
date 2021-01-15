import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ component: Component, ...rest }) {
  let isAuth = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Redirect to="/events" />;
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
}

export default PublicRoute;
