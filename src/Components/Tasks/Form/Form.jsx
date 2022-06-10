import React, { useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';

const FormTasks = ({
  addItem,
  editItem,
  showForm,
  setShowForm,
  setShowModal,
  setShowTitle,
  previewTask,
  setPreviewTask,
  setLoading,
  method
}) => {
  if (!showForm) {
    return null;
  }

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

  const fetchData = async (url, methodFunction) => {
    const options = {
      method: method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: userInput.description
      })
    };

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        setShowForm(false);
        setShowModal(true);
        setShowTitle(res.message);
      } else {
        setShowForm(false);
        setShowModal(true);
        setShowTitle(res.message);
        methodFunction(res.data);
        cleanFields();
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userInput._id) {
      const url = `${process.env.REACT_APP_API_URL}/tasks`;
      fetchData(url, addItem);
    } else {
      const url = `${process.env.REACT_APP_API_URL}/tasks/${userInput._id}`;
      fetchData(url, editItem);
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
