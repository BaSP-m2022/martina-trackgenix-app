import React, { useState } from 'react';
import styles from './addItem.module.css';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import Button from '../../Shared/Buttons/Buttons';

const AddItem = ({ showFormAdd, setShowFormAdd, addItem, setShowModal, setChildrenModal }) => {
  if (!showFormAdd) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: false
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        phone: userInput.phone,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active
      })
    };

    const url = `${process.env.REACT_APP_API_URL}/admins`;

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        setShowFormAdd(false);
        setShowModal(true);
        setChildrenModal(res.message);
      } else {
        setShowFormAdd(false);
        setShowModal(true);
        setChildrenModal(res.message);
        addItem(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new admin</h2>
        <div>
          <Input
            type="text"
            name="firstName"
            label={'First name'}
            value={userInput.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            label={'Last name'}
            value={userInput.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="text"
            name="phone"
            label={'Phone'}
            value={userInput.phone}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            label={'Email'}
            value={userInput.email}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            label={'Password'}
            value={userInput.password}
            onChange={onChange}
          />
        </div>
        <div>
          <RadioButton name="active" label={'Active'} value={[true, false]} onChange={onChange} />
        </div>
        <div>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        </div>
        <div>
          <Button onClick={() => setShowFormAdd(false)}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
