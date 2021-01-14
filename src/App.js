import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import BadgeDetails from './pages/BadgeDetails';

function App() {
  const [userData, setUserData] = useState({
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
          <Route exact path="/login" component={Login} />
          <PublicRoute exact path="/sign-up" component={SignUp} />

          <Layout>
            <Route exact path="/events" component={Events} />

            <ProtectedRoute path="/new-event" component={NewEvent} />
            <ProtectedRoute path="/:eventId/edit" component={EventEdit} />

            <ProtectedRoute path="/:eventId/badges" component={Badges} />

            <ProtectedRoute path="/:eventId/new-badge" component={NewBadge} />

            <ProtectedRoute path="/:badgeId/edit-badge" component={BadgeEdit} />

            <ProtectedRoute path="/badges/:badgeId" component={BadgeDetails} />
          </Layout>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
