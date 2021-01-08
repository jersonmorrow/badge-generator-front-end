import React from 'react';
import Modal from '../modal';

function DeleteModal(props) {
  const { isOpen, onClose, onDelete } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="is-flex is-flex-direction-column is-justify-content-center	is-align-items-center">
        <div className="mb-4 is-flex is-flex-direction-column is-justify-content-center	is-align-items-center">
          <h1>Are you Sure?</h1>
          <p>You're about to delete this event.</p>
        </div>
        <div className="field is-grouped ">
          <p className="control">
            <button onClick={onClose} className="button">
              Cancel
            </button>
          </p>
          <p className="control">
            <button onClick={onDelete} className="button is-danger">
              Delete
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
