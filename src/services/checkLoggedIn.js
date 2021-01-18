import Axios from 'axios';
import config from '../config/index';

export const checkLoggedIn = async (setUserData) => {
  let user = localStorage.getItem('user');

  if (user) {
    const validateUser = await Axios.post(
      `${config.apiUrl}/users/tokenIsValid`,
      null,
      { withCredentials: true }
    );
    if (validateUser.data) {
      const userResponse = await Axios.get(`${config.apiUrl}/users/`, {
        withCredentials: true,
      });
      setUserData({
        user: userResponse.data,
      });
      console.log('token valido');
    } else {
      console.log('token Invalido');
      alert('Invalid session');
    }
  } else {
    console.log('userData es undefined');
  }
};
