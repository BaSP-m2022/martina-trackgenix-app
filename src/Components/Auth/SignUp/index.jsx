import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from 'redux/employees/thunks';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Input, Button, Modal, Loader } from 'Components/Shared';
import joi from 'joi';
import styles from 'Components/Auth/SignUp/sign-up.module.css';

const SignUp = () => {
  const [userInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.employees.isLoading);

  const schema = joi.object({
    first_name: joi
      .string()
      .regex(/^[a-zA-Z_ ]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'First Name must contain only letters',
        'string.min': 'The name is too short',
        'string.max': 'The name is too long',
        'string.empty': 'This field is required'
      })
      .required(),
    last_name: joi
      .string()
      .regex(/^[a-zA-Z_ ]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'Last Name must contain only letters',
        'string.min': 'Last name is too short',
        'string.max': 'The last name is too long',
        'string.empty': 'This field is required'
      })
      .required(),
    phone: joi.number().min(1000000000).max(9999999999).required().messages({
      'number.min': 'Phone number must be 10 digits long',
      'number.max': 'Phone number must be 10 digits long',
      'number.empty': 'This field is required'
    }),
    email: joi
      .string()
      .regex(
        /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .messages({
        'string.pattern.base': 'Invalid email',
        'string.empty': 'This field is required'
      })
      .required(),
    password: joi
      .string()
      .min(6)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
        'string.empty': 'This field is required',
        'string.min': 'Password is too short'
      }),
    active: joi.boolean().required()
  });

  const {
    handleSubmit,
    register,
    // reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      first_name: userInput.first_name,
      last_name: userInput.last_name,
      phone: userInput.phone,
      email: userInput.email,
      password: userInput.password,
      active: true
    }
  });

  const onSubmit = async (data) => {
    try {
      const employee = await dispatch(addEmployee(data));
      if (employee.error) {
        setChildrenModal(employee.message);
        setShowModal(true);
      } else {
        setChildrenModal('Register successfully');
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <Modal
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
            className={styles.containerButtons}
          >
            {childrenModal}
            <Button onClick={() => history.push('/auth/login')}>Confirm</Button>
          </Modal>
          <div className={styles.containerForm}>
            <h2>Sign-Up</h2>
            <form>
              <div className={styles.containerInput}>
                <Input
                  type={'text'}
                  name={'first_name'}
                  label={'First Name'}
                  register={register}
                  error={errors.first_name?.message}
                />
              </div>
              <div className={styles.containerInput}>
                <Input
                  type={'text'}
                  name={'last_name'}
                  label={'Last Name'}
                  register={register}
                  error={errors.last_name?.message}
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
                  type={'text'}
                  name={'email'}
                  label={'Email'}
                  register={register}
                  error={errors.email?.message}
                />
              </div>
              <div className={styles.containerInput}>
                <Input
                  type={'password'}
                  name={'password'}
                  label={'Password'}
                  register={register}
                  error={errors.password?.message}
                />
              </div>
              <div className={styles.containerButtons}>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
              </div>
              <div className={styles.parLog}>
                <p>
                  Do you already have an account?
                  <a className={styles.anchor} href="/auth/login">
                    {' '}
                    Log in now!
                  </a>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
