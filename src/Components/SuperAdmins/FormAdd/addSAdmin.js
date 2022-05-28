import React, { useState } from 'react';
import styles from './addSAdmin.module.css';
const Form = () => {
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
  const onSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });
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
    const url = `${process.env.REACT_APP_API_URL}/super-admins/`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };
  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          {/* eslint-disable-next-line prettier/prettier */}
          <input type="text" name="firstName" value={userInput.firstName} onChange={onChange}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={userInput.lastName} onChange={onChange}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={userInput.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          {/* eslint-disable-next-line prettier/prettier */}
          <input type="password" name="password" value={userInput.password} onChange={onChange}></input>
        </div>
        <div>
          <label>Active</label>
          {/* eslint-disable-next-line prettier/prettier */}
          <input type="text" name="active" value={userInput.active} onChange={onChange}></input>
        </div>
        <div>
          <input type="submit" value="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default Form;
