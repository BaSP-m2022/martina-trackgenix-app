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

const LogInForm = () => {
  const [userInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const dispatch = useDispatch();

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
      if (user.payload?.role == 'EMPLOYEE') {
        console.log('entró al primer if');
        if (user.error) {
          console.log('entró al if de error');
          setChildrenModal(user.message);
          setShowModal(true);
        } else {
          // location.assign('/employee/home');
          console.log('entró al if de success');
          console.log('antes: ', childrenModal);
          setChildrenModal('Login successfully');
          console.log('despues: ', childrenModal);
          setShowModal(true);
          console.log('estado: ', showModal);
        }
      }
    } catch (error) {
      console.error(error);
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
