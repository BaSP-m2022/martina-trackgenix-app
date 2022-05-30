import React from 'react';
import styles from './modal.module.css';

const ModalError = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{props.title}</div>
      <button onClick={props.closeModal}>Close</button>
    </div>
  );
};

export default ModalError;
