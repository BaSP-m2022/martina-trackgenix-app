// by JAVI
import React, { useState } from 'react';
import styles from './addItem.module.css';

const AddItem = ({ show, closeForm, setShowModal }) => {
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

    fetch(url, options).then((response) => {
      if (response.status !== 201 && response.status !== 200) {
        return response.json().then(({ message }) => {
          alert(message);
        });
      }
      alert('Admin added');
      return response.json();
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new admin</h2>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={userInput.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last name</label>
          <input type="text" name="lastName" value={userInput.lastName} onChange={onChange}></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={userInput.phone} onChange={onChange}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={userInput.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={userInput.active} onChange={onChange}></input>
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            onSubmit={() => {
              setShowModal(true);
            }}
          ></input>
        </div>
        <div>
          <button onClick={closeForm}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
