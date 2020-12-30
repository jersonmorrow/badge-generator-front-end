import react, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/userContext';

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
    <div className="buttons">
      {userData.user ? (
        <button className="button is-light" onClick={logout}>
          Log out
        </button>
      ) : (
        <div>
          <button className="button is-primary" onClick={signup}>
            <strong>Sign-up</strong>
          </button>
          <button className="button is-light" onClick={login}>
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthOptions;
