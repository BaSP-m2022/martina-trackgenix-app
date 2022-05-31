import React from 'react';
import styles from './modal.module.css';

const Modal = ({ show, title, closeModal }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{title}</div>
      <a href="/super-admins">
        <button onClick={closeModal}>Close</button>
      </a>
    </div>
  );
};

export default Modal;
