import React, { useState } from 'react';
import styles from './addSAdmin.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';
import RadioButton from '../../Shared/Field/RadioButton';

const AddSuperAdmin = ({ show, closeForm, setShowModal, setShowTitle, addItem, setLoading }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active
      })
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.message);
        setLoading(false);
      } else {
        addItem(data.data);
        setShowTitle('Super Admin Created');
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
        <h2>Add SuperAdmin</h2>
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
        <RadioButton name="active" label={'Active'} value={[true, false]} onChange={onChange} />
        <div>
          <input
            type="submit"
            value="Confirm"
            onSubmit={() => {
              setShowModal(true);
            }}
          ></input>
        </div>
        <div>
          <Button onClick={closeForm}> Close </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSuperAdmin;
