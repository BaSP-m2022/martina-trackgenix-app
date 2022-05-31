import React from 'react';
import styles from './modal.module.css';

const Modal = ({ showModal, showTitle, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{showTitle}</div>
      <a href="/super-admins">
        <button onClick={() => setShowModal(false)}>Close</button>
      </a>
    </div>
  );
};

export default Modal;
