import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

function SignUp() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
  });

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, passwordCheck } = data;
    await Axios.post('http://localhost:5000/users/sign-up', data);
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
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          autoComplete="firstName"
          ref={register({ required: true })}
        />
        {errors.firstName && 'this input is required'}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="lastName"
          ref={register({ required: true })}
        />
        {errors.lastName && 'This input is required'}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          ref={register({
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'error message',
            },
          })}
        />

        {errors.email?.type === 'pattern' && (
          <p className="error">
            Please enter a valid email address. For example: amysmith@domain.com
          </p>
        )}
        {errors.email?.type === 'required' && (
          <p className="error">This is a required field</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          ref={register({
            required: true,
            minLength: {
              value: 8,
              message: 'error message',
            },
          })}
        />
        {errors.password?.type === 'required' && (
          <p className="error">This is a required field</p>
        )}
        {errors.password?.type === 'minLength' && (
          <p className="error">Your password must be 8 characters long</p>
        )}
        <input
          type="password"
          name="passwordCheck"
          id="passwordCheck"
          placeholder="Verify password"
          ref={register({ required: true })}
        />
        {errors.passwordCheck && 'This input is required'}
        {formState.isSubmitted && (
          <div className="success">Form submitted successfully</div>
        )}

        <input type="submit" value="Sign up" disabled={!formState.isValid} />
      </form>
    </div>
  );
}

export default SignUp;
