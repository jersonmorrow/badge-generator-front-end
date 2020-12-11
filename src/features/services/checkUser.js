import Axios from 'axios';

export async function checkUser(value) {
  try {
    const checkUserResponse = await Axios.post(
      'http://localhost:5000/users/check-user',
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
