import React from 'react';
import styles from 'Components/Admin/SuperAdmins/Form/superAdminForm.module.css';
import Button from 'Components/Shared/Buttons/Buttons';
import Input from 'Components/Shared/Field/Input';
import RadioButton from 'Components/Shared/Field/RadioButton';
import { useDispatch } from 'react-redux';
import { addSuperAdmin, editSuperAdmin } from 'redux/superAdmins/thunks';
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
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': 'First name must contain only letters'
      }),
    lastName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': 'Last name must contain only letters'
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers'
      }),
    active: Joi.boolean().required().messages({
      'boolean.base': 'You must select an option'
    })
  });

  const {
    handleSubmit,
    register,
    reset,
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
      <div className={styles.formButtonContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!previousSuperAdmin._id ? <h2>Add super admin</h2> : <h2>Edit super admin</h2>}
          <div className={styles.inputContainer}>
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
              label={'Last name'}
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
          </div>
          <RadioButton
            name={'active'}
            label={'Active'}
            valueOptions={[true, false]}
            register={register}
            error={errors.active?.message}
          />
        </form>
        <div className={styles.buttonContainer}>
          <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
          <Button onClick={() => reset()}>Reset form</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
export default SuperAdminForm;
