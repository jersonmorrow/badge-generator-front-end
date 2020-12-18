import React from 'react';
import { Link } from 'react-router-dom';
import EventsList from '../features/events/eventsList';

function Events() {
  return (
    <section className="section">
      <div className="container mx-6">
        <div className="is-flex is-justify-content-flex-end	">
          <Link to="/new-event">
            <button className="button is-success">New Event</button>
          </Link>
        </div>
        <EventsList />
      </div>
    </section>
  );
}

export default Events;
