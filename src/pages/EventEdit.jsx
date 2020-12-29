import React, { useEffect, useState } from 'react';
import api from '../api';
import EventEditItem from '../features/events/eventEditItem';
import PageLoading from '../features/loaders/pageLoading';
import defaultImage from '../images/default-image.png';

function EventEdit(props) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = props.match.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.events.read(eventId);
      setLoading(false);
      setData(data);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

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
      await api.events.update(eventId, payload);

      // history.push('/events');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (data) {
    return (
      <section className="section">
        <div className="container">
          <div>
            <div className="box">
              <EventEditItem data={data} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return true;
}

export default EventEdit;
