import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{props.title}</div>
      <a href="/projects">
        <button onClick={props.closeModal}>Close</button>
      </a>
    </div>
  );
};

export default Modal;
