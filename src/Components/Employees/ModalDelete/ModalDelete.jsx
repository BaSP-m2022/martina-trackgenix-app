import styles from './Delete.module.css';

const ModalDelete = ({ title, setShowModal }) => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.modal}>{title}</div>
      <button onClick={() => setShowModal(false)} className={styles.butMo}>
        Close
      </button>
    </div>
  );
};

export default ModalDelete;
