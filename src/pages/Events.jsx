import React from 'react';
import EventsList from '../features/events/eventsList';

function Events() {
  return (
    <section className="section">
      <div className="container mx-6">
        <div className="is-flex is-justify-content-flex-end	">
          <button className="button is-success">New Event</button>
        </div>
        <EventsList />
      </div>
    </section>
  );
}

export default Events;
