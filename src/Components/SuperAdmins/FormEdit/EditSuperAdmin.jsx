import React, { useState } from 'react';
import styles from './editSAdmin.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';

const EditSuperAdmin = ({
  showFormEdit,
  setShowFormEdit,
  previewSuperAdmin,
  setShowModal,
  setShowTitle,
  editItem,
  setLoading
}) => {
  if (!showFormEdit) {
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
        setShowFormEdit(false);
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
        <Input
          type={'text'}
          name={'firstName'}
          value={editSuperAdmins.firstName}
          onChange={onChange}
          label={'Name'}
        />
        <Input
          type={'text'}
          name={'lastName'}
          value={editSuperAdmins.lastName}
          onChange={onChange}
          label={'Last Name'}
        />
        <Input
          type={'text'}
          name={'email'}
          value={editSuperAdmins.email}
          onChange={onChange}
          label={'Email'}
        />
        <Input
          type={'password'}
          name={'password'}
          value={editSuperAdmins.password}
          onChange={onChange}
          label={'Password'}
        />
        <RadioButton name="active" label={'Active'} value={[true, false]} onChange={onChange} />
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          {' '}
          Confirm
        </Button>
        <div>
          <Button onClick={() => setShowFormEdit(false)}> Close </Button>
        </div>
      </form>
    </div>
  );
};
export default EditSuperAdmin;
