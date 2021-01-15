import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/default-image.png';

const EventEditItem = (props) => {
  const { data, onSubmit } = props;
  const [picture, setPicture] = useState(data.eventImage || defaultImage);

  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: data.title,
      organizer: data.organizer,
      location: data.location,
      date: new Date(data.date),
    },
  });

  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <form
        className="columns"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="column is-one-fifth is-flex is-flex-direction-column is-justify-content-center  is-align-items-center">
          <figure className="image is-96x96">
            <img
              width="96px"
              className="is-rounded is-vcentered"
              src={picture}
              alt="event-image"
            />
          </figure>

          <div className="field mt-3">
            <div className="file is-small">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple="false"
                  name="img"
                  ref={register}
                  onChange={onChangePicture}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Upload</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                ref={register}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="organizer"
                ref={register}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="*Location"
                name="location"
                ref={register}
              />
            </div>
          </div>

          <Controller
            control={control}
            register={register}
            rules={{ required: true }}
            name="date"
            render={({ onChange, onBlur, value }) => (
              <ReactDatePicker
                className="input"
                minDate={new Date()}
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                placeholderText="*Click to select Date"
                todayButton="Today"
                isClearable
              />
            )}
          />
        </div>
        <div className="column field is-grouped">
          <Link to="/events" className="control">
            <button className="button is-danger is-normal">Cancel</button>
          </Link>

          <p className="control">
            <button type="submit" className="button is-success is-normal">
              Save
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default EventEditItem;
