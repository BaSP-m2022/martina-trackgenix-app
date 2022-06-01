import React from 'react';
import styles from './modal.module.css';

const Modal = ({ showModal, title, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>{title}</p>
        <button onClick={() => setShowModal(false)}>x</button>
      </div>
    </div>
  );
};

export default Modal;
