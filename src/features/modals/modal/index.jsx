import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css';

function Modal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <div>
          <button
            onClick={onClose}
            className="modal-close is-large"
            aria-label="close"
          >
            x
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;
