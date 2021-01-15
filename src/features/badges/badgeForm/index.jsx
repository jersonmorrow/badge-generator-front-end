import React from 'react';
import { Link } from 'react-router-dom';

function BadgeForm(props) {
  const { onSubmit, register, errors, formState, eventId } = props;

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="*First Name"
            name="firstName"
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
            className="input"
            type="text"
            placeholder="*Last Name"
            name="lastName"
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
            className="input"
            type="text"
            placeholder="*Email"
            name="email"
            ref={register({
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              },
            })}
          />
          {errors.email?.type === 'required' && (
            <p className="help is-danger">This is a required field</p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="help is-danger">
              Please enter a valid email address. For example:
              amysmith@domain.com{' '}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="*Job Title"
            name="jobTitle"
            ref={register({
              required: true,
            })}
          />
          {errors.jobTitle?.type === 'required' && (
            <p className="help is-danger">This is a required field</p>
          )}
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="URL Badge Background Image"
            name="badgeImage"
            ref={register}
          />
          <span className="tag is-light mt-3">
            ⚠️ Background image must be at least 500x300 px!
          </span>
        </div>
      </div>

      <div className="field">
        <label>Categorie:</label>
        <br />
        <div className="select">
          <select
            name="categorie"
            ref={register({
              required: true,
            })}
          >
            <option value="Attende">Attende</option>
            <option value="Staff">Staff</option>
            <option value="Press">Press</option>
          </select>
        </div>
      </div>

      <div className="field is-grouped">
        <p className="control">
          <Link
            to={`/${eventId}/badges`}
            className="button is-danger is-normal"
          >
            Cancel
          </Link>
        </p>

        <p className="control">
          <button
            type="submit"
            className="button is-success is-normal"
            disabled={!formState.isValid}
          >
            Save
          </button>
        </p>
      </div>
    </form>
  );
}

export default BadgeForm;
