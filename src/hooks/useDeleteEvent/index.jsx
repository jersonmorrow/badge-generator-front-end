import { useEffect, useState } from 'react';
import api from '../../api';

function useDeleteEvents(props) {
  const [modal, setModal] = useState(false);

  const handleDeleteEvent = async (e) => {
    try {
      await api.events.remove(props._id);
      props.history.push('/events');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    modal,
    setModal,
    handleDeleteEvent,
  };
}

export default useDeleteEvents;
