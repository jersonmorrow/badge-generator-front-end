import React, { ReactFragment } from 'react';
import { Link } from 'react-router-dom';
import EventsListItem from '../eventsListItem';
import SearchEvents from '../searchEvents';

function EventsList(props) {
  const events = props.events;

  // useSearchEvents() hook here!

  return (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          <SearchEvents />
        </div>
      </div>
      <div className="mb-4">
        <strong>
          <p className="title is-5 ">Events</p>
        </strong>
      </div>
      <div className="box">
        <ul>
          <li>
            <EventsListItem event={events} />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default EventsList;
