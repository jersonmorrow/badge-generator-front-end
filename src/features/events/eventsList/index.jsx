import react from 'react';
import { Link } from 'react-router-dom';
import EventsListItem from '../eventsListItem';
import SearchEvents from '../searchEvents';

function EventsList(props) {
  const events = props.events;

  return (
    <div>
      <SearchEvents />
      <ul>
        <li>
          <Link>
            <EventsListItem />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default EventsList;
