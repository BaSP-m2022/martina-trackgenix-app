import React, { useState } from 'react';
import styles from './superAdminForm.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { addSuperAdmin, editSuperAdmin } from '../../../redux/superAdmins/thunks';

const SuperAdminForm = ({
  showForm,
  setShowForm,
  previousSuperAdmin,
  setPreviousSuperAdmin,
  setShowModal,
  setChildrenModal
  //editItem,
  //addItem,
  //method
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();
  const error = useSelector((state) => state.superAdmins.error);
  const message = useSelector((state) => state.superAdmins.message);

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

  // const fetchData = async (url, methodFunction) => {
  //   const options = {
  //     method: method,
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       firstName: inputSuperAdmin.firstName,
  //       lastName: inputSuperAdmin.lastName,
  //       email: inputSuperAdmin.email,
  //       password: inputSuperAdmin.password,
  //       active: inputSuperAdmin.active
  //     })
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const res = await response.json();
  //     if (response.status !== 200 && response.status !== 201) {
  //       setShowModal(true);
  //       setShowTitle(res.message);
  //     } else {
  //       methodFunction(res.data);
  //       setShowTitle('Super Admin updated successfully');
  //       setShowModal(true);
  //       setShowForm(false);
  //       cleanFields();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputSuperAdmin._id) {
      dispatch(addSuperAdmin(inputSuperAdmin));
    } else {
      dispatch(editSuperAdmin(inputSuperAdmin));
    }
    // if (!inputSuperAdmin._id) {
    //   const url = `${process.env.REACT_APP_API_URL}/super-admins`;
    //   fetchData(url, addItem);
    // } else {
    //   const url = `${process.env.REACT_APP_API_URL}/super-admins/${inputSuperAdmin._id}`;
    //   fetchData(url, editItem);
    // }
  };

  if (error) {
    setChildrenModal(message);
    setShowModal(true);
  }
  const onClose = () => {
    setShowForm(false);
    cleanFields();
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
