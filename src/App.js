import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './features/auth/login';
import Register from './features/auth/register';
import Header from './features/layout/header';
import UserContext from './features/context/userContext';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ userData, setUserData }}
      ></UserContext.Provider>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
