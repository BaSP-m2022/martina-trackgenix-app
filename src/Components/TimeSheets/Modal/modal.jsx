import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, setShowModal }) => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.modal}>{title}</div>
      <button onClick={() => setShowModal(false)} className={styles.button}>
        Close
      </button>
    </div>
  );
};


//  const Modal = ({ title, closeModal, show }) => {
//    if (!show) {
//      return null;
//    }

//  return (
//    <div className={styles.container}>
//      <div className={styles.modal}>{title}</div>
//      <a href="/time-sheets">
//        <button onClick={closeModal}>Close</button>
//      </a>
//    </div>
//  );
//};

export default Modal;
