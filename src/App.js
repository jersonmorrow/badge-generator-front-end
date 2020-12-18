import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewEvent from './pages/NewEvent';
import Events from './pages/Events';
import Login from './features/auth/login';
import SignUp from './features/auth/sign-up';
import UserContext from './features/context/userContext';
import Layout from './features/layout/Layout';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenResponse = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get('http://localhost:5000/users/', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userResponse.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/events" component={Events} />
            <Route path="/new-event" component={NewEvent} />
          </Switch>
        </Layout>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
