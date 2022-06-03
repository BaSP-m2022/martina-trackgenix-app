import React, { useState } from 'react';
import styles from './form.module.css';

const EditTask = ({
  show,
  closeForm,
  previewTask,
  setShowModal,
  setShowTitle,
  editItem
}) => {
  if (!show) {
    return null;
  }

  const [editTask, setEditTask] = useState({
    _id: previewTask._id,
    description: previewTask.description
  });

  const onChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const taskId = previewTask._id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: editTask.description
      })
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        options
      );
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.message);
      }
      editItem(editSuperAdmins);
      setShowTitle('Task updated successfully');
      setShowModal(true);
      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Task Description</h2>
          <input
            type="text"
            name="description"
            placeholder="new-description"
            value={editTask.description}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="submit"
            value="create"
            onSubmit={() => {
              setShowModal(true);
            }}
          />
        </div>
      </form>
      <div>
        <button onClick={closeForm}>Close</button>
      </div>
    </div>
  );
};

export default EditTask;

