import React, { useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';

const EditTask = ({
  show,
  closeForm,
  previewTask,
  setShowModal,
  setShowTitle,
  editItem,
  setLoading
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.data);
        setLoading(false);
      } else {
        editItem(editTask);
        setShowTitle('Task updated successfully');
        setShowModal(true);
        closeForm();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Task Description</h2>
          <Input
            type={'text'}
            name={'description'}
            label={'Edit your task:'}
            value={editTask.description}
            onChange={onChange}
          ></Input>
        </div>
        <div>
          <Button
            width={'80px'}
            height={'30px'}
            onSubmit={() => {
              setShowModal(true);
            }}
          >
            Create
          </Button>
        </div>
        <div>
          <Button onClick={closeForm} width={'80px'} height={'30px'}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
