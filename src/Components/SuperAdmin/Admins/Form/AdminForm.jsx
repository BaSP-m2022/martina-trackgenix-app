import React from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { addAdmin, editAdmin } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Input, Button } from 'Components/Shared';
import styles from 'Components/SuperAdmin/Admins/Form/adminForm.module.css';

const adminSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z_ ]*$/)
    .messages({
      'string.pattern.base': "Admin's name must contain only letters"
    })
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z_ ]*$/)
    .messages({
      'string.pattern.base': "Admin's last name must contain only letters"
    })
    .required(),
  phone: Joi.number().min(1000000000).max(9999999999).required().messages({
    'number.min': 'Phone number must be 10 digits long',
    'number.max': 'Phone number must be no more than 10 digits long'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8)
    .optional()
    .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .messages({
      'string.pattern.base': 'Password must contain letters and numbers'
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
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminSchema),
    defaultValues: {
      firstName: previousAdmin.firstName,
      lastName: previousAdmin.lastName,
      phone: previousAdmin.phone,
      email: previousAdmin.email
    }
  });

  const cleanFields = () => {
    setPreviousAdmin({
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
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
      <div className={styles.containerForm}>
        <div onClick={closeForm} className={styles.btnX}>
          X
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!previousAdmin._id ? <h2>Add a new admin</h2> : <h2>Edit admin</h2>}
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'firstName'}
              label={'First name'}
              register={register}
              error={errors.firstName?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'lastName'}
              label={'Last Name'}
              register={register}
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'phone'}
              label={'Phone'}
              register={register}
              error={errors.phone?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'email'}
              name={'email'}
              label={'Email'}
              register={register}
              error={errors.email?.message}
            />
          </div>
          {!previousAdmin._id && (
            <div className={styles.containerInput}>
              <Input
                type={'password'}
                name={'password'}
                label={'Password'}
                register={register}
                error={errors.password?.message}
              />
            </div>
          )}
        </form>
        <div className={styles.containerButtons}>
          <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
