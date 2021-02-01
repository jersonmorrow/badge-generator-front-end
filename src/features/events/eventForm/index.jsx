import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/default-image.png';
import useUploadImage from '../../../hooks/useUploadImage';

function EventForm(props) {
  const {
    onSubmit,
    register,
    errors,
    control,
    formState,
    eventImage,
    setImageUrl,
  } = props;
  const { uploadImage } = useUploadImage();
  const [image, setEventImage] = useState(defaultImage);

  const onChangePicture = (e) => {
    const data = e.target.files[0];
    setEventImage(URL.createObjectURL(data));
    uploadImage(data, setImageUrl);
  };

  useEffect(() => {
    const getImage = () => {
      if (eventImage) {
        setEventImage(eventImage);
      }
    };

    getImage();
  }, []);

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <div className="columns">
        <div className="column">
          <div className="text-fields">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="*Event title"
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
                  placeholder="*Organizer"
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
                  placeholderText="*Click to select Date"
                  todayButton="Today"
                  isClearable
                />
              )}
            />
            {errors.date?.type === 'required' && (
              <p className="help is-danger">This is a required field</p>
            )}
          </div>

          <div className="mt-6 field is-grouped">
            <p className="control">
              <Link to="/events" className="button is-danger is-normal">
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
        </div>

        <div className="column">
          <div className="field ml-6 mt-3">
            <div className="is-flex">
              <figure className="image is-96x96">
                <img
                  width="96px"
                  className="is-rounded"
                  src={image}
                  alt="event-logo"
                />
              </figure>
            </div>
            <div className="mt-2 file is-small">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple="false"
                  name="eventImage"
                  ref={register}
                  onChange={onChangePicture}
                />
                <span onClick className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Event logo</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EventForm;
