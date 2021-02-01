import React, { useEffect, useState } from 'react';
import defaultImage from '../../../assets/default-image.png';
import Moment from 'moment';
import DeleteModal from '../../modals/deleteModal';
import useDeleteItems from '../../../hooks/useDeleteItems';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import api from '../../../api/api';
import { storage } from '../../../firebase';

function EventsListItem(props) {
  const { eventItem } = props;
  const eventId = eventItem._id;
  const [loading, setLoading] = useState(false);
  const [eventImage, setEventImage] = useState(defaultImage);
  const [date, setDate] = useState('');

  const {
    modal,
    handleOpenModal,
    handleCloseModal,
    deleteImage,
  } = useDeleteItems();

  const handleDeleteEvent = async (e) => {
    setLoading(true);

    try {
      deleteImage(eventImage, storage);
      await api.events.remove(eventId);
      handleCloseModal();
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formatDate = () => {
    const date = eventItem.date;
    const formattedDate = Moment(date).format('LL');
    setDate(formattedDate);
  };

  useEffect(() => {
    const getImage = () => {
      if (eventItem.eventImage) {
        setEventImage(eventItem.eventImage);
      }
    };

    getImage();
    formatDate();
  });

  if (loading) {
    return (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={30}
        width={30}
        timeout={3000}
      />
    );
  }

  return (
    <div className="is-flex is-align-items-center is-justify-content-space-between">
      <div className="is-flex ml-3 is-align-items-center">
        <figure className="image is-96x96 m-0">
          <img
            width="90px"
            className="is-rounded is-vcentered"
            src={eventImage}
            alt="eventLogo"
          />
        </figure>
        <div className="ml-5">
          <strong>
            <p className="title is-5">{eventItem.title}</p>
          </strong>
          <p className="subtitle is-6 m-0">{eventItem.organizer}</p>
          <p className="subtitle is-6 m-0">{date}</p>
          <p className="subtitle is-6 m-0">{eventItem.location}</p>
        </div>
      </div>

      <div className="mr-3 field is-grouped">
        <p className="control">
          <Link className="button is-success" to={`/${eventId}/badges`}>
            <span>Badges</span>
            <span className="icon is-small">
              <i className="fas fa-id-badge"></i>
            </span>
          </Link>
        </p>
        <p className="control">
          <Link className="button is primary" to={`/${eventId}/edit`}>
            <span className="icon is-small">
              <i className="fas fa-edit"></i>
            </span>
          </Link>
        </p>

        <p className="control">
          <button
            onClick={handleOpenModal}
            className="button is-danger is-normal"
          >
            <span className="icon is-small">
              <i className="fas fa-trash-alt"></i>
            </span>
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
