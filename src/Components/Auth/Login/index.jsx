import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import Modal from 'Components/Shared/Modal/Modal';
import styles from 'Components/Auth/Login/login.module.css';
import { login } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';

const LogInForm = () => {
  const [userInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const schema = joi.object({
    email: joi
      .string()
      .required()
      .regex(
        /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .messages({
        'string.pattern.base': 'The email is invalid',
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
        'string.min': 'Password is too short',
        'string.empty': 'This field is required'
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
      email: userInput.email,
      password: userInput.password
    }
  });

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(login(data));
      console.log(user);
      if (user.error) {
        throw user.message;
      }
      console.log('role', user.payload.role);
      switch (user.payload.role) {
        case 'EMPLOYEE':
          return history.push('/employee');
        case 'ADMIN':
          return history.push('/admin');
        case 'SUPERADMIN':
          return history.push('/super-admin');
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      setChildrenModal(error);
      setShowModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        className={styles.containerButtons}
      >
        {childrenModal}
        <Button onClick={() => location.assign('/employee/home')}>Login</Button>
      </Modal>
      <div className={styles.containerForm}>
        <h2>Login</h2>
        <form>
          <div className={styles.divIm}>
            <Input
              type={'text'}
              name={'email'}
              label={'Email'}
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className={styles.divIm}>
            <Input
              type={'password'}
              name={'password'}
              label={'Password'}
              register={register}
              error={errors.password?.message}
            />
          </div>
        </form>
        <div className={styles.containerButtons}>
          <Button onClick={() => location.assign('/home')}>Close</Button>
          <Button onClick={handleSubmit(onSubmit)}>Login</Button>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
