import React, { useState } from 'react';
import styles from './employeeForm.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';

const EmployeeForm = ({
  showForm,
  setShowForm,
  addItem,
  setShowModal,
  setChildrenModal,
  setIsLoading,
  previewEmployee,
  setPreviewsEmployee,
  method,
  editItem
}) => {
  if (!showForm) {
    return null;
  }

  const [userInput, setUserInput] = useState(previewEmployee);

  const cleanFields = () => {
    setPreviewsEmployee({
      id: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      active: ''
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
        first_name: userInput.first_name,
        last_name: userInput.last_name,
        phone: userInput.phone,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active
      })
    };

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        setShowForm(false);
        setShowModal(true);
        setChildrenModal('The employee is added to the list');
      } else {
        setShowForm(false);
        setShowModal(true);
        setChildrenModal('The employee is added to the list');
        methodFunction(res.data);
        cleanFields();
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userInput._id) {
      const url = `${process.env.REACT_APP_API_URL}/employees`;
      fetchData(url, addItem);
    } else {
      const url = `${process.env.REACT_APP_API_URL}/employees/${userInput._id}`;
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
        <h2>Add new Employee</h2>
        <div>
          <Input
            type={'text'}
            name={'first_name'}
            value={userInput.first_name}
            onChange={onChange}
            label={'Name'}
          />
        </div>
        <div>
          <Input
            type={'text'}
            name={'last_name'}
            value={userInput.last_name}
            onChange={onChange}
            label={'Last Name'}
          />
        </div>
        <div>
          <Input
            type={'text'}
            name={'phone'}
            value={userInput.phone}
            onChange={onChange}
            label={'Phone'}
          />
        </div>
        <div>
          <Input
            type={'text'}
            name={'email'}
            value={userInput.email}
            onChange={onChange}
            label={'Email'}
          />
        </div>
        <div>
          <Input
            type={'password'}
            name={'password'}
            value={userInput.password}
            onChange={onChange}
            label={'Password'}
          />
        </div>
        <div>
          <RadioButton
            name={'active'}
            label={'Active'}
            value={['true', 'false']}
            onChange={onChange}
          />
        </div>
        <div className={styles.submitButton}>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
