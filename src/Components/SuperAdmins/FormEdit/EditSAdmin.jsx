import React, { useState } from 'react';
import styles from './editSAdmin.module.css';

const EditSAdmin = ({ show, closeForm, previewSuperAdmin, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [editSAdmin, setEditSAdmin] = useState({
    firstName: previewSuperAdmin.firstName,
    lastName: previewSuperAdmin.lastName,
    email: previewSuperAdmin.email,
    password: previewSuperAdmin.password,
    active: previewSuperAdmin.active
  });

  const onChange = (e) => {
    setEditSAdmin({ ...editSAdmin, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditSAdmin({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });

    const SAdminId = previewSuperAdmin._id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: editSAdmin.firstName,
        lastName: editSAdmin.lastName,
        email: editSAdmin.email,
        password: editSAdmin.password,
        active: editSAdmin.active
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/super-admins/${SAdminId}`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          setShowModal(true);
          setShowTitle(message);
          throw new Error(message);
        });
      }
      setShowTitle('Super Admin Successfully');
      setShowModal(true);
      return response.json();
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="firstName"
            value={editSAdmin.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={editSAdmin.lastName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={editSAdmin.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={editSAdmin.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={editSAdmin.active} onChange={onChange}></input>
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
export default EditSAdmin;
