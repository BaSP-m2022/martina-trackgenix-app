import styles from './modal.module.css';

const ModalError = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{props.msg}</div>
      <a href="/employees/form" onClick={props.closeModal}>
        Close
      </a>
    </div>
  );
};

export default ModalError;
