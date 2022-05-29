import styles from './Delete.module.css';

const ModalDelete = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.conteiner}>
      <div className={styles.modal}>{props.title}</div>
      <button onClick={props.closeModal}>Close</button>
    </div>
  );
};

export default ModalDelete;
