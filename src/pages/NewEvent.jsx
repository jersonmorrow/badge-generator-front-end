import React, { useState } from 'react';
import EventForm from '../features/events/eventForm';
import { useForm } from 'react-hook-form';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import useSetFormData from '../hooks/useSetFormData';
import Loader from 'react-loader-spinner';

function NewEvent() {
  const { register, handleSubmit, control, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { setFormData } = useSetFormData();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = new FormData();
      setFormData(data, payload, imageUrl);
      await api.events.create(payload);
      history.push('/events');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={30}
        width={30}
        timeout={3000}
      />
    );
  }

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
