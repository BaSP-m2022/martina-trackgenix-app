import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>{props.msg}</p>
        <a href="/employees/form" onClick={props.closeModal}>
          Close
        </a>
      </div>
    </div>
  );
};

export default Modal;
