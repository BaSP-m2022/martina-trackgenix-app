/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './superAdminForm.module.css';
import Button from '../../../Shared/Buttons/Buttons';
import Input from '../../../Shared/Field/Input';
import RadioButton from '../../../Shared/Field/RadioButton';
import { useDispatch } from 'react-redux';
import { addSuperAdmin, editSuperAdmin } from '../../../../redux/superAdmins/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

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

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().alphanum().min(8).required(),
    active: Joi.boolean().required().messages({
      'boolean.base': 'You must select an option'
    })
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: previousSuperAdmin.firstName,
      lastName: previousSuperAdmin.lastName,
      email: previousSuperAdmin.email,
      password: previousSuperAdmin.password,
      active: previousSuperAdmin.active
    }
  });

  const onClose = () => {
    setShowForm(false);
    cleanFields();
  };

  const onSubmit = async (data) => {
    if (!previousSuperAdmin._id) {
      const superAdminResponse = await dispatch(addSuperAdmin(data));
      if (superAdminResponse.error) {
        setChildrenModal(superAdminResponse.message);
        setShowModal(true);
      } else {
        onClose();
        setChildrenModal('Super Admin added');
        setShowModal(true);
      }
    } else {
      const superAdminResponse = await dispatch(editSuperAdmin(data, previousSuperAdmin._id));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {!previousSuperAdmin._id ? <h2>Add super admin</h2> : <h2>Edit super admin</h2>}
        <Input
          type={'text'}
          name={'firstName'}
          label={'First name'}
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          type={'text'}
          name={'lastName'}
          label={'Last Name'}
          register={register}
          error={errors.lastName?.message}
        />
        <Input
          type={'text'}
          name={'email'}
          label={'Email'}
          register={register}
          error={errors.email?.message}
        />
        <Input
          type={'password'}
          name={'password'}
          label={'Password'}
          register={register}
          error={errors.password?.message}
        />
        <RadioButton
          name="active"
          label={'Active'}
          valueOptions={[true, false]}
          register={register}
          error={errors.active?.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
        <div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </form>
    </div>
  );
};
export default SuperAdminForm;
