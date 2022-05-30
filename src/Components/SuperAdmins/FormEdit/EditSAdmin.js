import React, { useState } from 'react';
import styles from './editSAdmin.module.css';
import Modal from '../Modals/modal';
import ModalError from '../Modals/modalError';

const EditSAdmin = ({ previewSuperAdmin }) => {
  console.log(previewSuperAdmin);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

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

    const params = new URLSearchParams(window.location.search);
    const SAdminId = params.get('id');

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
          setEditSAdmin(true);
          throw new Error(message);
        });
      }
      setShowModal(true);
      return response.json();
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalError(false);
  };

  return (
    <div className={styles.container}>
      <Modal title={'SuperAdmin updated successfully'} show={showModal} closeModal={closeModal} />
      <ModalError title={'There was an error'} show={showModalError} closeModal={closeModal} />
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
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
          <input
            type="checkbox"
            name="active"
            value={(editSAdmin.active = 'true')}
            onChange={onChange}
          ></input>
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
      </form>
    </div>
  );
};
export default EditSAdmin;
