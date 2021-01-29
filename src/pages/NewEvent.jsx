import React, { useState } from 'react';
import EventForm from '../features/events/eventForm';
import { useForm } from 'react-hook-form';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import useSetFormData from '../hooks/useSetFormData';

function NewEvent() {
  const { register, handleSubmit, control, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { setFormData } = useSetFormData();
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      setFormData(data, payload, imageUrl);
      await api.events.create(payload);
      // history.push('/events');
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
              setImageUrl={setImageUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewEvent;
