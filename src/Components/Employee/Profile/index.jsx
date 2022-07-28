import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'Components/Employee/Profile/profile.module.css';
import { Input, Button, Modal } from 'Components/Shared';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { editEmployee } from 'redux/employees/thunks';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const employeeFound = useSelector((state) => state.auth?.user);

  const schema = joi.object({
    first_name: joi
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z_ ]*$/)
      .messages({
        'string.pattern.base': 'First Name must contain only letters'
      })
      .required(),
    last_name: joi
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z_ ]*$/)
      .messages({
        'string.pattern.base': 'Last Name must contain only letters'
      })
      .required(),
    phone: joi.number().min(1000000000).max(9999999999).required().messages({
      'number.min': 'Phone number must be 10 digits long',
      'number.max': 'Phone number must be 10 digits long'
    }),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .regex(
        /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .messages({
        'string.pattern.base': 'Invalid email'
      })
      .required()
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const employee = await dispatch(editEmployee(data, employeeFound._id));
      if (employee.error) {
        setChildrenModal(employee.message);
        setShowModal(true);
      } else {
        setChildrenModal('Profile updated successfully');
        setShowModal(true);
        setIsActive(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset({
      first_name: employeeFound?.first_name,
      last_name: employeeFound?.last_name,
      phone: employeeFound?.phone,
      email: employeeFound?.email
    });
  }, [employeeFound]);

  const handleClose = () => {
    setIsActive(false);
    reset();
  };

  return (
    <>
      {isActive === false ? (
        <section className={styles.container}>
          <Modal
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
            className={styles.containerButtons}
          >
            {childrenModal}
          </Modal>
          <div className={styles.containerFormMain}>
            <div className={styles.containerForm}>
              <h2>Profile</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    type={'text'}
                    name={'first_name'}
                    label={'First Name'}
                    register={register}
                    error={errors.first_name?.message}
                    disabled
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    name={'last_name'}
                    label={'Last Name'}
                    register={register}
                    error={errors.last_name?.message}
                    disabled
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    name={'phone'}
                    label={'Phone'}
                    register={register}
                    error={errors.phone?.message}
                    disabled
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    name={'email'}
                    label={'Email'}
                    register={register}
                    error={errors.email?.message}
                    disabled
                  />
                </div>
              </form>
              <div className={styles.containerButtons}>
                <Button width={'105px'} height={'35px'} onClick={() => setIsActive(true)}>
                  Edit Info
                </Button>
              </div>
            </div>
          </div>
          <img
            className={styles.imgContainer}
            src={`${process.env.PUBLIC_URL}/assets/images/Tgenix.png`}
          />
        </section>
      ) : (
        <section className={styles.container}>
          <div className={styles.containerFormMain}>
            <div className={styles.containerForm}>
              <h2>Profile</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    type={'text'}
                    name={'first_name'}
                    label={'First Name'}
                    register={register}
                    error={errors.first_name?.message}
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    name={'last_name'}
                    label={'Last Name'}
                    register={register}
                    error={errors.last_name?.message}
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    name={'phone'}
                    label={'Phone'}
                    register={register}
                    error={errors.phone?.message}
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    name={'email'}
                    label={'Email'}
                    register={register}
                    error={errors.email?.message}
                  />
                </div>
              </form>
              <div className={styles.containerButtons}>
                <Button width={'75px'} height={'35px'} onClick={handleSubmit(onSubmit)}>
                  Confirm
                </Button>
                <Button width={'75px'} height={'35px'} onClick={() => handleClose()}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <img
            className={styles.imgContainer}
            src={`${process.env.PUBLIC_URL}/assets/images/Tgenix.png`}
          />
        </section>
      )}
    </>
  );
};

export default Profile;
