import React, { useState } from 'react';
import styles from './superAdminForm.module.css';
import Button from '../../../Shared/Buttons/Buttons';
import Input from '../../../Shared/Field/Input';
import RadioButton from '../../../Shared/Field/RadioButton';
import { useDispatch } from 'react-redux';
import { addSuperAdmin, editSuperAdmin } from '../../../../redux/superAdmins/thunks';

const SuperAdminForm = ({
  showForm,
  setShowForm,
  previousSuperAdmin,
  setPreviousSuperAdmin,
  setShowModal,
  setChildrenModal
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const [inputSuperAdmin, setInputSuperAdmin] = useState(previousSuperAdmin);

  const cleanFields = () => {
    setPreviousSuperAdmin({
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });
  };

  const onChange = (e) => {
    setInputSuperAdmin({ ...inputSuperAdmin, [e.target.name]: e.target.value });
  };

  const onClose = () => {
    setShowForm(false);
    cleanFields();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputSuperAdmin._id) {
      const superAdminResponse = await dispatch(addSuperAdmin(inputSuperAdmin));
      if (superAdminResponse.error) {
        setChildrenModal(superAdminResponse.message);
        setShowModal(true);
      } else {
        onClose();
        setChildrenModal('Super Admin added');
        setShowModal(true);
      }
    } else {
      const superAdminResponse = await dispatch(editSuperAdmin(inputSuperAdmin));
      if (superAdminResponse.error) {
        setChildrenModal(superAdminResponse.message);
        setShowModal(true);
      } else {
        onClose();
        setChildrenModal('Super Admin edited');
        setShowModal(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form Edit</h2>
        <Input
          type={'text'}
          name={'firstName'}
          value={inputSuperAdmin.firstName}
          onChange={onChange}
          label={'Name'}
        />
        <Input
          type={'text'}
          name={'lastName'}
          value={inputSuperAdmin.lastName}
          onChange={onChange}
          label={'Last Name'}
        />
        <Input
          type={'text'}
          name={'email'}
          value={inputSuperAdmin.email}
          onChange={onChange}
          label={'Email'}
        />
        <Input
          type={'password'}
          name={'password'}
          value={inputSuperAdmin.password}
          onChange={onChange}
          label={'Password'}
        />
        <RadioButton name="active" label={'Active'} value={[true, false]} onChange={onChange} />
        <Button onClick={(e) => onSubmit(e)}>Confirm</Button>
        <div>
          <Button onClick={onClose}> Close </Button>
        </div>
      </form>
    </div>
  );
};
export default SuperAdminForm;
