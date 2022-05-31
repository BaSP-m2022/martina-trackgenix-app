import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, closeModal, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>{title}</div>
      <a href="/admins">
        <button onClick={closeModal}>Close</button>
      </a>
    </div>
  );
};
export default Modal;
