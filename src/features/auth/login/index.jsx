import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { checkUserLogin } from '../../../services/checkUser';
import ErrorNotice from '../../../misc/ErrorNotice';
import logo from '../../../assets/logo.png';
import homeBackground from '../../../assets/home-image.jpg';

function Login() {
  Axios.defaults.withCredentials = true;

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
  });
  const [error, setError] = useState();

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
        user: loginResponse.data.user,
      });
      localStorage.setItem('user', loginResponse.data.user);
      history.push('/events');
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="columns is-vcentered">
      <div className="login column is-4 ">
        <section className="section">
          <div className="has-text-centered">
            <img className="login-logo" src={logo} alt="logo" />
          </div>
          <h4 className="title is-4 has-text-centered">Log in</h4>
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <div className="field has-addons-right">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input is-normal"
                    type="email"
                    name="email"
                    id="login-email"
                    autoComplete="email"
                    placeholder="Email"
                    ref={register({
                      required: true,
                      validate: checkUserLogin || 'error message',
                    })}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>

                  {errors.email?.type === 'validate' && (
                    <p className="help is-danger">
                      No account with this email exists
                    </p>
                  )}

                  {errors.email?.type === 'required' && (
                    <p className="help is-danger">This is a required field</p>
                  )}
                </div>
              </div>

              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input is-normal"
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="login-password"
                    autoComplete="password"
                    ref={register({
                      required: true,
                    })}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>

                  {errors.password?.type === 'required' && (
                    <p className="help is-danger">This is a required field</p>
                  )}
                </div>
              </div>
              <div className="control">
                <button
                  type="submit"
                  class="button is-link"
                  disabled={!formState.isValid}
                >
                  Log in
                </button>
                <div class="has-text-centered">
                  Don't you have an account?
                  <Link to="./sign-up">Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      <div className="column is-8">
        <img src={homeBackground} alt="home-background" />
      </div>
    </div>
  );
}

export default Login;
