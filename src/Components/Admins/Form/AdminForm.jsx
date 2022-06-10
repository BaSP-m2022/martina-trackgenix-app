import React, { useState } from 'react';
import styles from './adminForm.module.css';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import Button from '../../Shared/Buttons/Buttons';

const AdminForm = ({
  showForm,
  setShowForm,
  addItem,
  setShowModal,
  setChildrenModal,
  setIsLoading,
  previousAdmin,
  setPreviousAdmin,
  method,
  editItem
}) => {
  if (!showForm) {
    return null;
  }

  const [userInput, setUserInput] = useState(previousAdmin);

  const cleanFields = () => {
    setPreviousAdmin({
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      active: false
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
        firstName: userInput.firstName,
        lastName: userInput.lastName,
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
        setChildrenModal(res.message);
      } else {
        setShowForm(false);
        setShowModal(true);
        setChildrenModal(res.message);
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
      const url = `${process.env.REACT_APP_API_URL}/admins`;
      fetchData(url, addItem);
    } else {
      const url = `${process.env.REACT_APP_API_URL}/admins/${userInput._id}`;
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
        <div className={styles.button}>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
