import React from 'react';
import styles from 'Components/SuperAdmin/Admins/Form/adminForm.module.css';
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
  phone: Joi.number().min(1000000000).required().messages({
    'number.min': 'Phone number must be 10 digits long'
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
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminSchema),
    defaultValues: {
      firstName: previousAdmin.firstName,
      lastName: previousAdmin.lastName,
      phone: previousAdmin.phone,
      email: previousAdmin.email,
      password: previousAdmin.password,
      active: previousAdmin.active
    }
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

  const onSubmit = async (data) => {
    if (!previousAdmin._id) {
      const adminResponse = await dispatch(addAdmin(data));
      if (adminResponse.error) {
        setChildrenModal(adminResponse.message);
        setShowModal(true);
      } else {
        closeForm();
        setChildrenModal('Admin added');
        setShowModal(true);
      }
    } else {
      const adminResponse = await dispatch(editAdmin(data, previousAdmin._id));
      if (adminResponse.error) {
        setChildrenModal(adminResponse.message);
        setShowModal(true);
      } else {
        closeForm();
        setChildrenModal('Admin edited');
        setShowModal(true);
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
      </form>
      <div className={styles.button}>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        <Button onClick={() => reset()}>Reset Form</Button>
        <Button onClick={closeForm}>Close</Button>
      </div>
    </div>
  );
};

export default AdminForm;
