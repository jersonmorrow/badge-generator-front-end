import React from 'react';
import { Link } from 'react-router-dom';

function BadgeForm(props) {
  const { onSubmit, register, errors } = props;

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="First Name"
            name="name"
            ref={register({
              required: true,
            })}
          />
          {errors.name?.type === 'required' && (
            <p className="help is-danger">This is a required field</p>
          )}
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Last Name"
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
            placeholder="Email"
            name="email"
            ref={register({
              required: true,
            })}
          />
          {errors.email?.type === 'required' && (
            <p className="help is-danger">This is a required field</p>
          )}
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="JobTitle"
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
            placeholder="URL Badge Image"
            name="badgeImage"
            ref={register}
          />
        </div>
      </div>

      <div className="field">
        <label>Categorie</label>
        <div className="select">
          <select name="categorie" ref={register}>
            <option value="Attende">Attende</option>
            <option value="Staff">Staff</option>
            <option value="Press">Press</option>
          </select>
        </div>
      </div>

      <div className="field is-grouped">
        <Link to="/badges" className="control">
          <button className="button is-danger is-normal">Cancel</button>
        </Link>

        <p className="control">
          <button type="submit" className="button is-success is-normal">
            Save
          </button>
        </p>
      </div>
    </form>
  );
}

export default BadgeForm;
