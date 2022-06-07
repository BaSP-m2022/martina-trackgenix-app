import React, { useState } from 'react';
import styles from './editSAdmin.module.css';
import Button from '../../Shared/Buttons/Buttons';

const EditSuperAdmin = ({
  show,
  closeForm,
  previewSuperAdmin,
  setShowModal,
  setShowTitle,
  editItem,
  setLoading
}) => {
  if (!show) {
    return null;
  }

  const [editSuperAdmins, setEditSuperAdmins] = useState({
    _id: previewSuperAdmin._id,
    firstName: previewSuperAdmin.firstName,
    lastName: previewSuperAdmin.lastName,
    email: previewSuperAdmin.email,
    password: previewSuperAdmin.password,
    active: previewSuperAdmin.active
  });

  const onChange = (e) => {
    setEditSuperAdmins({ ...editSuperAdmins, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const SuperAdminsId = previewSuperAdmin._id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: editSuperAdmins.firstName,
        lastName: editSuperAdmins.lastName,
        email: editSuperAdmins.email,
        password: editSuperAdmins.password,
        active: editSuperAdmins.active
      })
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admins/${SuperAdminsId}`,
        options
      );
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.message);
        setLoading(false);
      } else {
        editItem(editSuperAdmins);
        setShowTitle('Super Admin updated successfully');
        setShowModal(true);
        closeForm();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
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
            value={editSuperAdmins.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={editSuperAdmins.lastName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={editSuperAdmins.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={editSuperAdmins.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <select name="active" value={editSuperAdmins.active} onChange={onChange}>
            <option></option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
          <Button onClick={closeForm}> Close </Button>
        </div>
      </form>
    </div>
  );
};
export default EditSuperAdmin;
