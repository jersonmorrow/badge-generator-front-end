import React from 'react';
import EventForm from '../features/events/eventForm';
import { useForm } from 'react-hook-form';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';

function NewEvent() {
  const { register, handleSubmit, control, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { title, organizer, location, date, img } = data;

    const payload = new FormData();
    payload.append('title', title);
    payload.append('organizer', organizer);
    payload.append('location', location);
    payload.append('date', date);
    payload.append('eventImage', img[0]);

    try {
      await api.events.create(payload);

      history.push('/events');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="container is-flex is-justify-content-center mx-6">
        <div classNam="column">
          <div className="my-6">
            <strong>
              <p className="title is-5">Create a New Event</p>
            </strong>
          </div>
          <EventForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            control={control}
            formState={formState}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewEvent;
