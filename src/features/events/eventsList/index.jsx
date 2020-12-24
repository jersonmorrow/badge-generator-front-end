import React, { ReactFragment } from 'react';
import { Link } from 'react-router-dom';
import useSearchEvents from '../../../hooks/useSearchEvents';
import EventsListItem from '../eventsListItem';
import SearchEvents from '../searchEvents';

function EventsList(props) {
  const events = props.events;

  const { query, setQuery, filteredEvents } = useSearchEvents(events);

  if (filteredEvents.length === 0) {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <SearchEvents query={query} setQuery={setQuery} />
          </div>
        </div>

        <h3>No Events were found</h3>
        <Link className="button is-success" to="/new-event">
          New Event
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <strong>
          <p className="title is-5 ">Events</p>
        </strong>
      </div>
      <div className="box">
        <ul>
          {filteredEvents.map((eventItem) => {
            return (
              <li>
                <Link>
                  <EventsListItem event={events} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default EventsList;
