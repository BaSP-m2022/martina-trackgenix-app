import styles from './Delete.module.css';

const ModalDelete = (props) => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.modal}>{props.title}</div>
      <button onClick={() => props.closeModal()}>Close</button>
    </div>
  );
};

export default ModalDelete;
