import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventsList from '../features/events/eventsList';
import api from '../api';
import PageLoading from '../features/loaders/pageLoading';

function Events() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchData();

    let intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.events.list();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section">
      <div className="container mx-6">
        <div className="is-flex is-justify-content-flex-end	">
          <Link className="button is-success" to="/new-event">
            New event
          </Link>
        </div>
        <EventsList events={data} />
      </div>
    </section>
  );
}

export default Events;
