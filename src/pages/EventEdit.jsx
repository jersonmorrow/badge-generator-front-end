import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/api.js';
import PageLoading from '../features/loaders/pageLoading';
import { useHistory } from 'react-router-dom';
import EventForm from '../features/events/eventForm';
import { useForm } from 'react-hook-form';
import PageError from '../pages/PageError';

function EventEdit(props) {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = props.match.params;
  const history = useHistory();

  const { register, handleSubmit, control, errors, formState, reset } = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
      values: useMemo(() => data, [data]),
    }
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const dataResponse = await api.events.read(eventId);
      setData(dataResponse);
      setLoading(false);
      reset({
        title: dataResponse.title,
        organizer: dataResponse.organizer,
        location: dataResponse.location,
        date: new Date(dataResponse.date),
        eventImage: dataResponse.eventImage,
      });
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);

    const { title, organizer, location, date, img } = data;

    const payload = new FormData();
    payload.append('title', title);
    payload.append('organizer', organizer);
    payload.append('location', location);
    payload.append('date', date);
    payload.append('eventImage', img[0]);

    try {
      await api.events.update(eventId, payload);
      history.push('/events');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <div className="my-6">
              <strong>
                <p className="title is-4">Edit Event</p>
              </strong>
            </div>
            <EventForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              control={control}
              formState={formState}
              eventImage={data.eventImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventEdit;
