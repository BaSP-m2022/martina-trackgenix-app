import React, { useState } from 'react';
import styles from './EditForm.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';

const EditEmployee = ({
  show,
  closeForm,
  previewEmployee,
  setShowModal,
  setShowTitle,
  editEmployee,
  setLoading
}) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    _id: previewEmployee._id,
    first_name: previewEmployee.first_name,
    last_name: previewEmployee.last_name,
    phone: previewEmployee.phone,
    email: previewEmployee.email,
    password: previewEmployee.password,
    active: previewEmployee.active
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const EmployeeId = previewEmployee._id;

    const putEmployee = {
      method: 'PUT',
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${EmployeeId}`,
        putEmployee
      );
      const res = await response.json();
      if (!response.ok) {
        setShowModal(true);
        setShowTitle(`${res.msg} cannot create employee`);
        setLoading(false);
      } else {
        closeForm(true);
        editEmployee(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit employee</h2>
        <Input
          type={'text'}
          name={'firstName'}
          value={userInput.firstName}
          onChange={onChange}
          label={'Name'}
        />
        <Input
          type={'text'}
          name={'lastName'}
          value={userInput.lastName}
          onChange={onChange}
          label={'Last Name'}
        />
        <Input
          type={'text'}
          name={'phone'}
          value={userInput.phone}
          onChange={onChange}
          label={'Phone'}
        />
        <Input
          type={'text'}
          name={'email'}
          value={userInput.email}
          onChange={onChange}
          label={'Email'}
        />
        <Input
          type={'password'}
          name={'password'}
          value={userInput.password}
          onChange={onChange}
          label={'Password'}
        />
        <RadioButton
          name={'active'}
          label={'Active'}
          value={['true', 'false']}
          onChange={onChange}
        />
        <div className={styles.submitButton}>
          <input type="submit" value="Confirm changes"></input>
        </div>
        <Button onClick={closeForm}>x</Button>
      </form>
    </div>
  );
};

export default EditEmployee;
