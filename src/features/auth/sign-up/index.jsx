import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { checkUser } from '../../../services/checkUser';

function SignUp() {
  const { register, handleSubmit, errors, formState, getValues } = useForm({
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
    <div className="column is-one-third">
      <div className="box box-padding">
        <h4 className="title is-4">Sign up</h4>
        <div className="field has-addons-right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <div className="control">
                <input
                  className="input is-normal"
                  type="text"
                  name="firstName"
                  id="signup-firstName"
                  autoComplete="firstName"
                  placeholder="First Name"
                  ref={register({
                    required: true,
                  })}
                />
                {errors.firstName?.type === 'required' && (
                  <p className="help is-danger">This is a required field</p>
                )}
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input is-normal"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  id="signup-lastName"
                  autoComplete="lastName"
                  ref={register({
                    required: true,
                  })}
                />
                {errors.lastName?.type === 'required' && (
                  <p className="help is-danger">This is a required field</p>
                )}
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input is-normal"
                  type="email"
                  name="email"
                  id="signup-email"
                  placeholder="Email"
                  autoComplete="email"
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'error message',
                    },
                    validate: checkUser || 'error message',
                  })}
                />
                {errors.email?.type === 'validate' && (
                  <p className="help is-danger">
                    This email address is already in use
                  </p>
                )}

                {errors.email?.type === 'pattern' && (
                  <p className="help is-danger">
                    Please enter a valid email address. For example:
                    amysmith@domain.com
                  </p>
                )}

                {errors.email?.type === 'required' && (
                  <p className="help is-danger">This is a required field</p>
                )}
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input is-normal"
                  type="password"
                  name="password"
                  id="signup-password"
                  placeholder="Password"
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
                  <p className="help is-danger">This is a required field</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="help is-danger">
                    Your password must be 8 characters long
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input is-normal"
                  type="password"
                  name="passwordCheck"
                  id="signup-passwordCheck"
                  placeholder="Confirm Password"
                  ref={register({
                    required: true,
                    validate: (value) =>
                      value === getValues('password') || 'error message',
                  })}
                />
                {errors.passwordCheck?.type === 'validate' && (
                  <p className="help is-danger">Password fields don't match</p>
                )}
                {errors.passwordCheck?.type === 'required' && (
                  <p className="help is-danger">This is a required field</p>
                )}
              </div>
            </div>

            <div className="control">
              <button
                type="submit"
                className="button is-link"
                disabled={!formState.isValid}
              >
                Sign up
              </button>
            </div>

            <div class="has-text-centered">
              Alreadyt have an account?
              <Link to="./login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
