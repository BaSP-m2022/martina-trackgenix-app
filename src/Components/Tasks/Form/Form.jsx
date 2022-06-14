import React, { useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../../redux/tasks/thunks';

const FormTasks = ({ showForm, setShowForm, previewTask, setPreviewTask }) => {
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
      dispatch(addTask(userInput));
    } else {
      dispatch(editTask(userInput));
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
