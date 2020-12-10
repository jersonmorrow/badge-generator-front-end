import react, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const signup = () => history.push('./sign-up');
  const login = () => history.push('./login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <div>
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <div>
          <button onClick={signup}>Sign-up</button>
          <button onClick={login}>Log in</button>
        </div>
      )}
    </div>
  );
}

export default AuthOptions;
