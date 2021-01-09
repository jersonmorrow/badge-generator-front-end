import React, { useEffect, useState } from 'react';
import defaultImage from '../../../assets/default-image.png';
import DeleteModal from '../../modals/deleteModal';
import useDeleteItems from '../../../hooks/useDeleteItems';
import { Link } from 'react-router-dom';

function BadgesListItem(props) {
  const { badgeItem } = props;
  const badgeId = badgeItem._id;

  const [image, setImage] = useState(defaultImage);

  const {
    modal,
    handleDeleteBadge,
    handleOpenModal,
    handleCloseModal,
  } = useDeleteItems(badgeItem);

  // const getImage = () => {
  //   if (badgeItem.badgeImage) {
  //     setImage(badgeItem.badgeImage);
  //   }
  // };

  // useEffect(() => {
  //   getImage();
  // });

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
          <p className="title is-5">{`${badgeItem.firstName} ${badgeItem.lastName}`}</p>
        </strong>
        <p className="subtitle is-6 m-0">{badgeItem.email}</p>
        <p className="subtitle is-6 m-0">{badgeItem.jobTitle}</p>
        <div>
          <p className="subtitle is-6 m-0">{badgeItem.categorie}</p>
        </div>
      </div>

      <div className="field is-grouped">
        <Link className="button is primary" to={`/${badgeId}/edit`}>
          Edit
        </Link>
        <p className="control">
          <button
            onClick={handleOpenModal}
            className="button is-danger is-normal"
          >
            Delete
          </button>
          <DeleteModal
            isOpen={modal}
            onClose={handleCloseModal}
            onDelete={handleDeleteBadge}
          />
        </p>
      </div>
    </div>
  );
}

export default BadgesListItem;
