import { useState } from 'react';

function useDeleteItems() {
  const [modal, setModal] = useState(false);

  const handleOpenModal = (e) => {
    setModal(true);
  };

  const handleCloseModal = (e) => {
    setModal(false);
  };

  return {
    modal,
    setModal,
    handleOpenModal,
    handleCloseModal,
  };
}

export default useDeleteItems;
