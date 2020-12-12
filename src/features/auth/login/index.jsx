import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { checkUserLogin } from '../../services/checkUser';
import ErrorNotice from '../../misc/ErrorNotice';

function Login() {
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
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      history.push('/');
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="column is-one-third">
      <div className="box box-padding">
        <h4 className="title is-4">Log in</h4>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
