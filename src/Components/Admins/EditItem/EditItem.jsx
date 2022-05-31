import React, { useState } from 'react';
import styles from './editItem.module.css';

const EditItem = ({ editItem, adminId }) => {
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
    editItem(userInput);
    setUserInput({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      active: ''
    });
  };

  const puttingAdmin = () => {
    const putAdmin = {
      method: 'PUT',
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

    const url = `${process.env.REACT_APP_API_URL}/admins/${adminId}`;

    fetch(url, putAdmin)
      .then((response) => response.json())
      .then((data) => console.log('data:', data));
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Edit admin</h2>
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
          <input type="submit" value="Submit" onClick={puttingAdmin} />
        </div>
      </form>
    </div>
  );
};

export default EditItem;
