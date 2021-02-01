import { useState } from 'react';

function useDeleteItems() {
  const [modal, setModal] = useState(false);

  const handleOpenModal = (e) => {
    setModal(true);
  };

  const handleCloseModal = (e) => {
    setModal(false);
  };

  const deleteImage = (eventImage, storage) => {
    let imageUrl = eventImage;

    storage
      .refFromURL(imageUrl)
      .delete()
      .catch((err) => console.error(err));
  };

  return {
    modal,
    setModal,
    handleOpenModal,
    handleCloseModal,
    deleteImage,
  };
}

export default useDeleteItems;
