import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, closeModal, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>{title}</div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};
export default Modal;
