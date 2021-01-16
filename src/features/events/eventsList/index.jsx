import React from 'react';
import { Link } from 'react-router-dom';
import useSearchItem from '../../../hooks/useSearchItems';
import EventsListItem from '../eventsListItem';
import SearchEvents from '../searchEvents';

function EventsList(props) {
  const { events } = props;
  const { query, setQuery, filteredItems } = useSearchItem(events);

  if (filteredItems.length === 0) {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <SearchEvents query={query} setQuery={setQuery} />
          </div>
        </div>

        <h3>No Events were found!</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <div>
          <SearchEvents query={query} setQuery={setQuery} />
        </div>
      </div>
      <div className="mb-4">
        <strong>
          <p className="title is-5 ">Events</p>
        </strong>
      </div>
      <ul className="mb-4 content">
        {filteredItems.map((eventItem) => {
          return (
            <li className="box" key={eventItem._id}>
              <EventsListItem eventItem={eventItem} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EventsList;
