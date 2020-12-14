import React from 'react';
import eventImage from '../../../images/event-image.jpg';

function EventsListItem() {
  return (
    <div>
      <div>
        <img src={eventImage} alt="event-image" width="100" />
      </div>
      <div>
        <strong>
          <h3>Event Title</h3>
        </strong>
        <br />
        <h4>Organizer</h4>
        <br />
        <h6>Time</h6>
        <br />
        <h6>Location</h6>
      </div>
      <div>
        <button>Create Event Badge</button>
        <button>Delete Event</button>
      </div>
    </div>
  );
}

export default EventsListItem;
