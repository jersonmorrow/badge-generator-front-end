import Axios from 'axios';

export const checkLoggedIn = async (setUserData) => {
  let user = localStorage.getItem('user');

  if (!user) {
    localStorage.clear();
  } else {
    const validateUser = await Axios.post(
      'http://localhost:5000/users/tokenIsValid',
      null,
      { withCredentials: true }
    );
    if (validateUser.data) {
      const userResponse = await Axios.get('http://localhost:5000/users/', {
        withCredentials: true,
      });
      setUserData({
        user: userResponse.data,
      });
    }
  }
};
