import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventsList from '../features/events/eventsList';
import api from '../api';
import PageLoading from '../features/loaders/pageLoading';
import PageError from './PageError';
import Loader from 'react-loader-spinner';

function Events() {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();

    let intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.events.list();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError({ error: error });
    }
  };

  if (loading === true && !data) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <section className="section">
      <div className="container mx-6">
        <div className="is-flex is-justify-content-flex-end	">
          <Link className="button is-success" to="/new-event">
            New event
          </Link>
        </div>
        <EventsList events={data} />
        <div className="is-flex is-justify-content-center">
          {loading && (
            <Loader
              type="Grid"
              color="#00BFFF"
              height={50}
              width={50}
              timeout={3000}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Events;
