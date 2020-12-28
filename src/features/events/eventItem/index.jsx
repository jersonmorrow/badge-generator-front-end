import React from 'react';

const EventItem = (props) => {
  const { image, title, organizer, date, location } = props;

  return (
    <div className="is-flex is-align-items-center">
      <div>
        <figure className="image is-96x96">
          <img
            width="96px"
            className="is-rounded is-vcentered"
            src={image}
            alt="event-image"
          />
        </figure>
      </div>

      <div className="mx-4">
        <strong>
          <p className="title is-5">{title}</p>
        </strong>
        <p className="subtitle is-6 m-0">{organizer}</p>
        <p className="subtitle is-6 m-0">{date}</p>
        <p className="subtitle is-6 m-0">{location}</p>
      </div>
    </div>
  );
};

export default EventItem;
