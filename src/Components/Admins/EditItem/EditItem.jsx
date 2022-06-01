// by JAVI
import React, { useState } from 'react';
import styles from './editItem.module.css';

const EditAdmin = ({ show, closeForm, previewAdmin, setShowModal }) => {
  if (!show) {
    return null;
  }

  const [editAdmin, setEditAdmin] = useState({
    firstName: previewAdmin.firstName,
    lastName: previewAdmin.lastName,
    phone: previewAdmin.phone,
    email: previewAdmin.email,
    password: previewAdmin.password,
    active: previewAdmin.active
  });

  const onChange = (e) => {
    setEditAdmin({ ...editAdmin, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: editAdmin.firstName,
        lastName: editAdmin.lastName,
        phone: editAdmin.phone,
        email: editAdmin.email,
        password: editAdmin.password,
        active: editAdmin.active
      })
    };

    const url = `${process.env.REACT_APP_API_URL}/admins/${AdminId}`;

    fetch(url, options).then((response) => {
      if (response.status !== 201 && response.status !== 200) {
        return response.json().then(({ message }) => {
          alert(message);
        });
      }
      alert('Admin edited');
      return response.json();
    });
  };

  const AdminId = previewAdmin._id;

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit admin</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="firstName"
            value={editAdmin.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={editAdmin.lastName} onChange={onChange}></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={editAdmin.phone} onChange={onChange}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={editAdmin.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={editAdmin.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={editAdmin.active} onChange={onChange}></input>
        </div>
        <div>
          <input
            type="submit"
            value="Confirm"
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

export default EditAdmin;
