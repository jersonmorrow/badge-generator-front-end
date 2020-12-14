import React from 'react';
import eventImage from '../../../images/event-image.jpg';

function EventsListItem() {
  return (
    <div className="is-flex is-align-items-center">
      <div>
        <figure className="image is-96x96">
          <img
            width="96px"
            className="is-rounded is-vcentered"
            src={eventImage}
            alt="event-image"
          />
        </figure>
      </div>

      <div className="mx-4">
        <strong>
          <p className="title is-5">F8 Conference</p>
        </strong>
        <p className="subtitle is-6 m-0">Facebook</p>
        <p className="subtitle is-6 m-0">24 September</p>
        <p className="subtitle is-6 m-0">San Jose California, ave</p>
      </div>

      <div className="field is-grouped">
        <p className="control">
          <button className="button is-success is-normal">
            Create Event Badge
          </button>
        </p>
        <p className="control">
          <button className="button is-primary is-normal">Edit Event</button>
        </p>
        <p className="control">
          <button className="button is-danger is-normal">Delete Event</button>
        </p>
      </div>
    </div>
  );
}

export default EventsListItem;
