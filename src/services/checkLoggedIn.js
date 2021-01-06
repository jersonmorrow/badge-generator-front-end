import Axios from 'axios';

export const checkLoggedIn = async (setUserData) => {
  let token = localStorage.getItem('auth-token');
  if (!token) {
    localStorage.clear();
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
