import React from 'react';
import styles from './adminForm.module.css';
import Input from 'Components/Shared/Field/Input';
import RadioButton from 'Components/Shared/Field/RadioButton';
import Button from 'Components/Shared/Buttons/Buttons';
import { useDispatch } from 'react-redux/es/exports';
import { addAdmin, editAdmin } from 'redux/admins/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

const adminSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  phone: Joi.number().min(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).required(),
  active: Joi.boolean().required()
});
const AdminForm = ({
  showForm,
  setShowForm,
  setShowModal,
  setChildrenModal,
  previousAdmin,
  setPreviousAdmin
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminSchema)
  });

  const cleanFields = () => {
    setPreviousAdmin({
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      active: false
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!previousAdmin._id) {
      const adminResponse = await dispatch(addAdmin(previousAdmin));
      if (adminResponse.error) {
        setChildrenModal(adminResponse.message);
        setShowModal(true);
      } else {
        closeForm();
      }
    } else {
      const adminResponse = await dispatch(editAdmin(previousAdmin));
      if (adminResponse.error) {
        setChildrenModal(adminResponse.message);
        setShowModal(true);
      } else {
        closeForm();
      }
    }
  };

  const closeForm = () => {
    cleanFields();
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!previousAdmin._id ? <h2>Add a new admin</h2> : <h2>Edit admin</h2>}
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
          name={'phone'}
          label={'Phone'}
          register={register}
          error={errors.phone?.message}
        />
        <Input
          type={'email'}
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
        <div className={styles.button}>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
