import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import NewEvent from './pages/NewEvent';
import Events from './pages/Events';
import Login from './features/auth/login';
import SignUp from './features/auth/sign-up';
import UserContext from './context/userContext';
import EventEdit from './pages/EventEdit';
import ProtectedRoute from './routers/protectedRoute';
import { checkLoggedIn } from './services/checkLoggedIn';
import PublicRoute from './routers/publicRoute';
import Layout from './layout/Layout';
import NewBadge from './pages/NewBadge';
import Badges from './pages/Badges';
import BadgeEdit from './pages/BadgeEdit';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    checkLoggedIn(setUserData);
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/sign-up" component={SignUp} />

          <Layout>
            <ProtectedRoute
              exact
              path="/events"
              user={userData.user}
              component={Events}
            />

            <ProtectedRoute
              path="/new-event"
              user={userData.user}
              component={NewEvent}
            />
            <ProtectedRoute
              path="/:eventId/edit"
              user={userData.user}
              component={EventEdit}
            />

            <ProtectedRoute
              path="/:eventId/badges"
              user={userData.user}
              component={Badges}
            />

            <ProtectedRoute
              path="/:eventId/new-badge"
              user={userData.user}
              component={NewBadge}
            />

            <ProtectedRoute
              path="/:badgeId/edit-badge"
              user={userData.user}
              component={BadgeEdit}
            />
          </Layout>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
