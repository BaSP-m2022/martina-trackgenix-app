import React from 'react';
import styles from './modal.module.css';

const Modal = ({ titleModal, showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.conteiner}>
      <div className={styles.modal}>{titleModal}</div>
      <button onClick={() => setShowModal(false)} className={styles.button}>
        Close
      </button>
    </div>
  );
};

export default Modal;
