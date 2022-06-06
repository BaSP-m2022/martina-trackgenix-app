import React, { useState } from 'react';
import styles from './AddEmployee.module.css';

const AddEmployee = ({ show, closeForm, setShowModal, setShowTitle, newEmployee }) => {
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

  const onSubmit = async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, postEmployee);
      const res = await response.json();
      if (!response.ok) {
        setShowModal(true);
        setShowTitle(`${res.msg} cannot create employee`);
      } else {
        setShowModal(true);
        setShowTitle(res.message);
        newEmployee(res.data);
        closeForm(true);
      }
    } catch (error) {
      console.error(error);
    }
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
          <label>Status</label>
          <select name="active" value={userInput.active} onChange={onChange}>
            <option value="">Select status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
