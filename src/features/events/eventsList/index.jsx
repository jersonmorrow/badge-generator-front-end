import React from 'react';
import { Link } from 'react-router-dom';
import useSearchEvents from '../../../hooks/useSearchEvents';
import EventsListItem from '../eventsListItem';
import SearchEvents from '../searchEvents';

function EventsList(props) {
  const { events } = props;
  const { query, setQuery, filteredEvents } = useSearchEvents(events);

  if (!filteredEvents) {
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
      <div className="columns">
        <div className="column">
          <SearchEvents query={query} setQuery={setQuery} />
        </div>
      </div>
      <div className="mb-4">
        <strong>
          <p className="title is-5 ">Events</p>
        </strong>
      </div>
      <ul className="mb-4 content">
        {filteredEvents.map((eventItem) => {
          return (
            <li className="box" key={eventItem._id}>
              <Link to={`/events/${eventItem._id}`}>
                <EventsListItem eventItem={eventItem} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EventsList;
