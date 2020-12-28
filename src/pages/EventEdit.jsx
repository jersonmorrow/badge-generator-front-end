import React, { useEffect, useState } from 'react';
import api from '../api';
import EventItem from '../features/events/eventItem';
import PageLoading from '../features/loaders/pageLoading';
import defaultImage from '../images/default-image.png';

function EventEdit(props) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
    <React.Fragment>
      <EventItem
        title={data.title || 'TITLE'}
        image={data.eventImage || defaultImage}
        organizer={data.organizer || 'ORGANIZER'}
        date={data.date || 'DATE'}
        location={data.location || 'LOCATION'}
      />
    </React.Fragment>
  );
}

export default EventEdit;
