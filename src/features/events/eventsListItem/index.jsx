import React, { useEffect, useState } from 'react';
import defaultImage from '../../../images/default-image.png';
import Moment from 'moment';

function EventsListItem(props) {
  const [image, setImage] = useState(defaultImage);
  const [date, setDate] = useState('');
  const { eventItem } = props;

  const getImage = () => {
    if (eventItem.eventImage) {
      setImage(eventItem.eventImage);
    }
  };

  const formatDate = () => {
    const date = Date(eventItem.date);
    const formattedDate = Moment(date).format('LL');
    setDate(formattedDate);
  };

  useEffect(() => {
    getImage();
    formatDate();
  });

  return (
    <div className="is-flex is-align-items-center">
      <div>
        <figure className="image is-96x96">
          <img
            width="96px"
            className="is-rounded is-vcentered"
            src={`http://localhost:5000/${image}`}
            alt="event-image"
          />
        </figure>
      </div>

      <div className="mx-4">
        <strong>
          <p className="title is-5">{eventItem.title}</p>
        </strong>
        <p className="subtitle is-6 m-0">{eventItem.organizer}</p>
        <p className="subtitle is-6 m-0">{date}</p>
        <p className="subtitle is-6 m-0">{eventItem.location}</p>
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
