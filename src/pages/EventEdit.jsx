import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/api.js';
import PageLoading from '../features/loaders/pageLoading';
import { useHistory } from 'react-router-dom';
import EventForm from '../features/events/eventForm';
import { useForm } from 'react-hook-form';
import PageError from '../pages/PageError';
import useSetFormData from '../hooks/useSetFormData/index.jsx';
import useDeleteItems from '../hooks/useDeleteItems/index.jsx';

function EventEdit(props) {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = props.match.params;
  const { setFormData } = useSetFormData();
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();
  const { updateImage } = useDeleteItems();

  const { register, handleSubmit, control, errors, formState, reset } = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
      values: useMemo(() => eventData, [eventData]),
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dataResponse = await api.events.read(eventId);
        setEventData(dataResponse);
        setLoading(false);
        reset({
          title: dataResponse.title,
          organizer: dataResponse.organizer,
          location: dataResponse.location,
          date: new Date(dataResponse.date),
        });
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = new FormData();
      setFormData(data, payload, imageUrl);
      updateImage(imageUrl, eventData);
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
              eventImage={eventData.eventImage}
              setImageUrl={setImageUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventEdit;
