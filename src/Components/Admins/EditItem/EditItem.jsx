// by JAVI
import React, { useState } from 'react';
import styles from './editItem.module.css';

const EditAdmin = ({ show, closeForm, previewAdmin, setShowModal, editItem }) => {
  if (!show) {
    return null;
  }

  const [editAdmin, setEditAdmin] = useState({
    _id: previewAdmin._id,
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

  const onSubmit = async (e) => {
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

    const AdminId = previewAdmin._id;
    const url = `${process.env.REACT_APP_API_URL}/admins/${AdminId}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        alert(data.message);
      } else {
        alert(data.message);
        editItem(editAdmin);
        closeForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
