import React from 'react';
import styles from './modalJavi.module.css';

const ModalJavi = ({ showModal, showTitle, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{showTitle}</div>
      <a href="/admins">
        <button onClick={() => setShowModal(false)}>Close</button>
      </a>
    </div>
  );
};

export default ModalJavi;
