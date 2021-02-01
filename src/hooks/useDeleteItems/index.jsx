import { useState } from 'react';
import { storage } from '../../firebase';
import defaultImage from '../../assets/default-image.png';

function useDeleteItems() {
  const [modal, setModal] = useState(false);

  const handleOpenModal = (e) => {
    setModal(true);
  };

  const handleCloseModal = (e) => {
    setModal(false);
  };

  const deleteImage = (eventImage) => {
    if (eventImage !== defaultImage) {
      let imageUrl = eventImage;

      storage
        .refFromURL(imageUrl)
        .delete()
        .catch((err) => console.error(err));
    }
  };

  const updateImage = (imageUrl, eventData) => {
    let currentImage = eventData.eventImage;
    let newImage = imageUrl;

    if (currentImage) {
      if (newImage !== '') {
        storage
          .refFromURL(currentImage)
          .delete()
          .catch((err) => console.log(err));
      }
    }
  };

  return {
    modal,
    setModal,
    handleOpenModal,
    handleCloseModal,
    deleteImage,
    updateImage,
  };
}

export default useDeleteItems;
