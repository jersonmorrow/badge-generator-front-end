import React, { useState } from 'react';
import DeleteModal from '../../modals/deleteModal';
import useDeleteItems from '../../../hooks/useDeleteItems';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import Loader from 'react-loader-spinner';

function BadgesListItem(props) {
  const { badgeItem, eventLogo } = props;
  const badgeId = badgeItem._id;
  const [loading, setLoading] = useState(false);

  const { modal, handleOpenModal, handleCloseModal } = useDeleteItems(
    badgeItem
  );

  const handleDeleteBadge = async (e) => {
    setLoading(true);

    try {
      await api.badges.remove(badgeId);
      handleCloseModal();
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
            src={eventLogo}
            alt="event-logo"
          />
        </figure>
        <div className="ml-5">
          <strong>
            <p className="title is-5">{`${badgeItem.firstName} ${badgeItem.lastName}`}</p>
          </strong>
          <p className="subtitle is-6 m-0">{badgeItem.email}</p>
          <p className="subtitle is-6 m-0">{badgeItem.jobTitle}</p>
          <div>
            <p className="subtitle is-6 mt-3">
              <span className="tag is-primary is-light is-medium">
                {badgeItem.categorie}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mr-3 field is-grouped">
        <p className="control">
          <Link className="button is-success" to={`/badges/${badgeId}`}>
            <span>Print Badge</span>
            <span className="icon is-small">
              <i className="fas fa-print"></i>
            </span>
          </Link>
        </p>

        <p className="control">
          <Link className="button" to={`/${badgeId}/edit-badge`}>
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
            onDelete={handleDeleteBadge}
          />
        </p>
      </div>
    </div>
  );
}

export default BadgesListItem;
