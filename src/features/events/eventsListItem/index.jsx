import React, { useEffect, useState } from 'react';
import defaultImage from '../../../assets/default-image.png';
import Moment from 'moment';
import DeleteModal from '../../modals/deleteModal';
import useDeleteItems from '../../../hooks/useDeleteItems';
import { Link } from 'react-router-dom';

function EventsListItem(props) {
  const { eventItem } = props;
  const eventId = eventItem._id;

  const [image, setImage] = useState(defaultImage);
  const [date, setDate] = useState('');

  const {
    modal,
    handleDeleteEvent,
    handleOpenModal,
    handleCloseModal,
  } = useDeleteItems(eventItem);

  const getImage = () => {
    if (eventItem.eventImage) {
      setImage(eventItem.eventImage);
    }
  };

  const formatDate = () => {
    const date = eventItem.date;
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
            src={image}
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
        <Link
          className="button is-success"
          to={{
            pathname: `/${eventId}/badges`,
            aboutProps: {
              eventData: eventItem,
            },
          }}
        >
          Badges
        </Link>
        <Link className="button is primary" to={`/${eventId}/edit`}>
          Edit
        </Link>
        <p className="control">
          <button
            onClick={handleOpenModal}
            className="button is-danger is-normal"
          >
            Delete Event
          </button>
          <DeleteModal
            isOpen={modal}
            onClose={handleCloseModal}
            onDelete={handleDeleteEvent}
          />
        </p>
      </div>
    </div>
  );
}

export default EventsListItem;
