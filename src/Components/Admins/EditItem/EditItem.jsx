import React, { useState } from 'react';
import styles from './editItem.module.css';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import Button from '../../Shared/Buttons/Buttons';

const EditAdmin = ({
  showFormEdit,
  setShowFormEdit,
  setShowModal,
  setChildrenModal,
  previewAdmin,
  editItem,
  setShowLoader
}) => {
  if (!showFormEdit) {
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
    setShowLoader(true);

    if (confirm('Are you sure you want to modify the Admin?')) {
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
          setShowModal(true);
          setChildrenModal(data.message);
        } else {
          setShowModal(true);
          setChildrenModal(data.message);
          editItem(data.data);
          setShowFormEdit(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setShowLoader(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit admin</h2>
        <div>
          <Input
            type="text"
            name="firstName"
            label={'First name'}
            value={editAdmin.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            label={'Last name'}
            value={editAdmin.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="text"
            name="phone"
            label={'Phone'}
            value={editAdmin.phone}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            label={'Email'}
            value={editAdmin.email}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            label={'Password'}
            value={editAdmin.password}
            onChange={onChange}
          />
        </div>
        <div>
          <RadioButton name="active" label={'Active'} value={[true, false]} onChange={onChange} />
        </div>
        <div>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        </div>
        <div>
          <Button onClick={() => setShowFormEdit(false)}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
