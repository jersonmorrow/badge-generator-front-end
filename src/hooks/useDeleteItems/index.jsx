import { useState } from 'react';
import api from '../../api/api.js';

function useDeleteItems(props) {
  const [modal, setModal] = useState(false);

  const handleOpenModal = (e) => {
    setModal(true);
  };

  const handleCloseModal = (e) => {
    setModal(false);
  };

  const handleDeleteEvent = async (e) => {
    try {
      await api.events.remove(props._id);
      props.history.push('/events');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBadge = async (e) => {
    try {
      await api.badges.remove(props._id);
      props.history.push('/badges');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    modal,
    setModal,
    handleDeleteEvent,
    handleDeleteBadge,
    handleOpenModal,
    handleCloseModal,
  };
}

export default useDeleteItems;