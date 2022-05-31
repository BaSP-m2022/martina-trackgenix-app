// by JAVI
import React, { useState } from 'react';
import styles from './addItem.module.css';

const AddItem = ({ show, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      active: ''
    });
  };

  const postAdmin = {
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

  fetch(url, postAdmin).then((response) => {
    if (response.status !== 200 && response.status !== 201) {
      return response.json().then(({ message }) => {
        setShowModal(true);
        setShowTitle(message);
      });
    }
    setShowTitle('Admin Created');
    setShowModal(true);
    return response.json();
  });

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new admin</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input type="text" name="firstName" value={userInput.firstName} onChange={onChange} />
        </div>
        <div>
          <label>Last name</label>
          <input type="text" name="lastName" value={userInput.lastName} onChange={onChange} />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={userInput.phone} onChange={onChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={userInput.email} onChange={onChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={userInput.password} onChange={onChange} />
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={userInput.active} onChange={onChange} />
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            onSubmit={() => {
              setShowModal(true);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
