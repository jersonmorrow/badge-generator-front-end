import React, { useEffect, useState } from 'react';
import api from '../api';
import EventForm from '../features/events/eventForm';
import EventItem from '../features/events/eventItem';
import PageLoading from '../features/loaders/pageLoading';
import defaultImage from '../images/default-image.png';
import { useForm } from 'react-hook-form';

function EventEdit(props) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { register, handleSubmit, control, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.events.read(props.match.params.eventId);
      setLoading(false);
      setData(data);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <section className="section">
      <div className="container is-flex is-justify-content-center">
        <div>
          <div className="box is-flex is-justify-content-flex-start	">
            <EventItem
              title={data.title || 'TITLE'}
              image={data.eventImage || defaultImage}
              organizer={data.organizer || 'ORGANIZER'}
              date={data.date || 'DATE'}
              location={data.location || 'LOCATION'}
            />
          </div>
          <div className="mt-6">
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

export default EventEdit;
