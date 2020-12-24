import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventsList from '../features/events/eventsList';
import api from '../api';

function Events() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchData();
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
          <Link to="/new-event">
            <button className="button is-success">New Event</button>
          </Link>
        </div>
        {/* <EventsList badges={eventList} /> */}
      </div>
    </section>
  );
}

export default Events;
