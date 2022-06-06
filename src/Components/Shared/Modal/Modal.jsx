import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, isOpen, handleClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.shade}>
      <div className={styles.billboard}>
        <button onClick={handleClose} className={styles.btnX}>
          X
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
