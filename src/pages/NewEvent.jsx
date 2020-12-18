import React from 'react';
import EventForm from '../features/events/eventForm';

function NewEvent() {
  return (
    <React.Fragment>
      <div className="container is-flex is-justify-content-center mx-6">
        <div classNam="column">
          <div className="my-6">
            <strong>
              <p className="title is-5">Create a New Event</p>
            </strong>
          </div>
          <EventForm />
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewEvent;
