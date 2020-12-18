import React, { useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function EventForm() {
  const { register, handleSubmit, control, errors } = useForm({
    mode: 'onChanges',
    reValidateMode: 'onChange',
  });

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              className="file-input"
              type="file"
              accept="image/*"
              multiple="false"
              name="img"
              ref={(register, imageUploader)}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <div
              className="box is-clickable is-flex is-justify-content-center is-align-items-center"
              onClick={() => imageUploader.current.click()}
            >
              <img width="70" ref={uploadedImage} />
            </div>
            <h6 class="title is-6">Upload Image...</h6>
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
      </div>
    </form>
  );
}

export default EventForm;
