import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

function Login() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
  });

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();
      const { email, password } = data;
      const loginResponse = await Axios.post(
        'http://localhost:5000/users/login',
        {
          email,
          password,
        }
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          name="email"
          id="login-email"
          autoComplete="email"
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          name="password"
          id="login-password"
          autoComplete="password"
          ref={register({
            required: true,
          })}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;
