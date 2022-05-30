import React, { useState } from 'react';
import styles from './AddEmployee.module.css';
import Modal from '../Modals/Modal';
import ModalError from '../Modals/Modal';

const AddEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  let errorMessage = ''; //I will use this var to send the error message to the modal

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
        first_name: userInput.firstName,
        last_name: userInput.lastName,
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
        } else {
          setShowModalError(true);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalError(false);
  };

  return (
    <div className={styles.container}>
      <Modal msg={'Employee added successfully'} show={showModal} closeModal={closeModal} />
      <ModalError msg={`Error: ${errorMessage}`} show={showModalError} closeModal={closeModal} />
      <div>
        <h2>Add new Employee</h2>
      </div>
      <form onSubmit={onSubmit}>
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
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
