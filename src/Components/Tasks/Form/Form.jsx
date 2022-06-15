import React, { useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../../redux/tasks/thunks';

const FormTasks = ({
  showForm,
  setShowForm,
  previewTask,
  setPreviewTask,
  setShowModal,
  setChildrenModal
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState(previewTask);

  const cleanFields = () => {
    setPreviewTask({
      _id: '',
      description: ''
    });
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userInput._id) {
      try {
        const taskResponse = await dispatch(addTask(userInput));
        if (taskResponse.error) {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const taskResponse = await dispatch(editTask(userInput));
        if (taskResponse.error) {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const closeForm = () => {
    cleanFields();
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Task Description</h2>
          <Input
            type={'text'}
            label={'Description:'}
            name={'description'}
            placeholder={'new-description'}
            value={userInput.description}
            onChange={onChange}
          ></Input>
        </div>
        <div>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        </div>
        <div>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTasks;
