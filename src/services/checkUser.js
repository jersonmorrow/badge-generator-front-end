import Axios from 'axios';
import config from '../config/index';

export async function checkUser(value) {
  try {
    const checkUserResponse = await Axios.post(
      `${config.apiUrl}/users/check-user`,
      {
        email: value,
      }
    );
    const userStatus = await checkUserResponse.data.status;
    if (userStatus === 'EXISTS') {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkUserLogin(value) {
  try {
    const checkUserResponse = await Axios.post(
      `${config.apiUrl}/users/check-user`,
      {
        email: value,
      }
    );
    const userStatus = await checkUserResponse.data.status;
    if (userStatus === 'DOES NOT EXISTS') {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
