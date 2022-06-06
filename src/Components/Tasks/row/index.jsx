import React, { useState } from 'react';
import styles from './row.module.css';
import EditTask from '../EditForm';

const Row = ({ task, deleteTask, setShowModal, setShowTitle, editItem }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const closeForm = () => {
    setShowFormEdit(false);
  };

  const openForm = () => {
    setShowFormEdit(true);
  };

  return (
    <tr id={task._id} className={styles.container}>
      <td>{task._id}</td>
      <td>{task.description}</td>
      <td>
        <button
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          X
        </button>
      </td>
      <td>
        <EditTask
          key={task._id}
          previewTask={task}
          show={showFormEdit}
          closeForm={closeForm}
          setShowModal={setShowModal}
          setShowTitle={setShowTitle}
          editItem={editItem}
        />
        <a>
          <button onClick={openForm}>&#9998;</button>
        </a>
      </td>
    </tr>
  );
};
export default Row;
