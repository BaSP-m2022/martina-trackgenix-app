import React, { useState } from 'react';
import styles from './editSAdmin.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';

const EditSuperAdmin = ({
  action,
  showFormEdit,
  setShowFormEdit,
  previewSuperAdmin,
  setShowModal,
  setShowTitle,
  setList,
  setLoading
}) => {
  if (!showFormEdit) {
    return null;
  }

  const [superAdminsInput, setsuperAdminsInput] = useState({
    _id: previewSuperAdmin._id,
    firstName: previewSuperAdmin.firstName,
    lastName: previewSuperAdmin.lastName,
    email: previewSuperAdmin.email,
    password: previewSuperAdmin.password,
    active: previewSuperAdmin.active
  });

  const onChange = (e) => {
    setsuperAdminsInput({ ...superAdminsInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const SuperAdminsId = previewSuperAdmin._id;

    const method = () => {
      if (action === 'add') {
        const options = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            firstName: superAdminsInput.firstName,
            lastName: superAdminsInput.lastName,
            email: superAdminsInput.email,
            password: superAdminsInput.password,
            active: superAdminsInput.active
          })
        };
        return options;
      } else if (action === 'edit') {
        const options = {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            firstName: superAdminsInput.firstName,
            lastName: superAdminsInput.lastName,
            email: superAdminsInput.email,
            password: superAdminsInput.password,
            active: superAdminsInput.active
          })
        };
        return options;
      }
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admins/${SuperAdminsId}`,
        method
      );
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.message);
        setLoading(false);
      } else {
        setList(superAdminsInput);
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
        <h2>Form Edit</h2>
        <Input
          type={'text'}
          name={'firstName'}
          value={superAdminsInput.firstName}
          onChange={onChange}
          label={'Name'}
        />
        <Input
          type={'text'}
          name={'lastName'}
          value={superAdminsInput.lastName}
          onChange={onChange}
          label={'Last Name'}
        />
        <Input
          type={'text'}
          name={'email'}
          value={superAdminsInput.email}
          onChange={onChange}
          label={'Email'}
        />
        <Input
          type={'password'}
          name={'password'}
          value={superAdminsInput.password}
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
