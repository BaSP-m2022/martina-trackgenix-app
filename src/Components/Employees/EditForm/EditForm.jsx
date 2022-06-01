import React, { useState } from 'react';
import styles from './EditForm.module.css';

const EditEmployee = ({ show, closeForm, previewEmployee, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
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

    const url = `${process.env.REACT_APP_API_URL}/employees/${EmployeeId}`;

    fetch(url, putEmployee)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.success) {
          console.log(jsonResponse);
          setShowTitle(jsonResponse.msg);
          setShowModal(true);
        } else {
          setShowTitle(jsonResponse.msg);
          setShowModal(true);
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit employee</h2>
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
          <input type="submit" value="Confirm changes"></input>
        </div>
        <button onClick={closeForm}>
          <a href="/employees">x</a>
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
