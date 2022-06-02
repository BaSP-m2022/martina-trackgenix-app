import React from 'react';
import styles from './modal.module.css';

const Modal = ({ showModal, showTitle, setShowModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {showTitle}
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
