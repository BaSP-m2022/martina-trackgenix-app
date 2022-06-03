import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.conteiner}>
      <div className={styles.modal}>{title}</div>
      <button onClick={() => setShowModal(false)} className={styles.button}>
        Close
      </button>
    </div>
  );
};

export default Modal;
