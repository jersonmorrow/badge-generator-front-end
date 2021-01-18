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
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <div className="my-6">
              <strong>
                <p className="title is-4">Create a New Event</p>
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
      </div>
    </section>
  );
}

export default NewEvent;
