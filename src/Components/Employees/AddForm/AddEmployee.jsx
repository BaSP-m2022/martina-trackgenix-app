import React, { useState } from 'react';
import styles from './AddEmployee.module.css';

const AddEmployee = ({ show, closeForm, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    first_name: '',
    last_name: '',
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
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      active: ''
    });

    const postEmployee = {
      method: 'POST',
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
    const url = `${process.env.REACT_APP_API_URL}/employees`;

    fetch(url, postEmployee)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.success) {
          setShowModal(true);
          setShowTitle('Employee successfully added');
        } else {
          setShowModal(true);
          setShowTitle('Error');
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new Employee</h2>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="first_name"
            value={userInput.first_name}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            name="last_name"
            value={userInput.last_name}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="number" name="phone" value={userInput.phone} onChange={onChange}></input>
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
        <div className={styles.submitButton}>
          <input type="submit" value="Submit"></input>
        </div>
        <button onClick={closeForm}>x</button>
      </form>
    </div>
  );
};

export default AddEmployee;