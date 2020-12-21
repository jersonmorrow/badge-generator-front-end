import React, { useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

function EventForm(props) {
  const { onSubmit, register, errors, control } = props;

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <div className="columns">
        <div className="column">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Event title"
                name="title"
                ref={register({
                  required: true,
                })}
              />
              {errors.title?.type === 'required' && (
                <p className="help is-danger">This is a required field</p>
              )}
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Organizer"
                name="organizer"
                ref={register({
                  required: true,
                })}
              />
              {errors.organizer?.type === 'required' && (
                <p className="help is-danger">This is a required field</p>
              )}
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="*Location"
                name="location"
                ref={register({
                  required: true,
                })}
              />
              {errors.location?.type === 'required' && (
                <p className="help is-danger">This is a required field</p>
              )}
            </div>
          </div>

          <Controller
            control={control}
            register={register({ required: true })}
            rules={{ required: true }}
            name="date"
            render={({ onChange, onBlur, value }) => (
              <ReactDatePicker
                className="input"
                minDate={new Date()}
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                placeholderText="Click to select Date"
                todayButton="Today"
                isClearable
              />
            )}
          />
          {errors.date?.type === 'required' && (
            <p className="help is-danger">This is a required field</p>
          )}
        </div>

        <div className="column is-flex">
          <div className="is-flex-direction-column is-align-items-center is-justify-content-center	">
            <input
              className="input"
              type="file"
              accept="image/png, image/jpeg"
              multiple="false"
              name="img"
              ref={register}
            />
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <Link to="/events" className="control">
          <button className="button is-danger is-normal">Cancel</button>
        </Link>

        <p className="control">
          <button type="submit" className="button is-success is-normal">
            Create event
          </button>
        </p>
      </div>
    </form>
  );
}

export default EventForm;
