import React from 'react';
import styles from './modalJavi.module.css';

const ModalJavi = ({ showModal, showTitle, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{showTitle}</div>
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
};

export default ModalJavi;
