import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'Components/Employee/Profile/profile.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import RadioButton from 'Components/Shared/Field/RadioButton';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { getEmployees } from 'redux/employees/thunks';
import Modal from 'Components/Shared/Modal/Modal';
import { editEmployee } from 'redux/employees/thunks';

const EmployeeProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const employeeId = '629d41966737e327d3189242';

  const listEmployee = useSelector((state) => state.employees.list);

  const employeeFound = listEmployee.find((employee) => employee._id == employeeId);

  const schema = joi.object({
    first_name: joi.string().min(3).max(30).required(),
    last_name: joi.string().min(3).max(30).required(),
    phone: joi.number().min(10).max(14).required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().min(6).max(8).required(),
    active: joi.boolean().required()
  });

  useEffect(() => {
    reset({
      first_name: employeeFound?.first_name,
      last_name: employeeFound?.last_name,
      phone: employeeFound?.phone,
      email: employeeFound?.email,
      password: employeeFound?.password,
      active: employeeFound?.active
    });
  }, [employeeFound]);

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
        <Button onClick={() => location.assign('/employee/home')}>Confirm</Button>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal>
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
          <div>
            <Input
              type={'password'}
              name={'password'}
              label={'Password'}
              register={register}
              error={errors.password?.message}
            />
          </div>
          <div>
            <RadioButton
              name={'active'}
              label={'Active'}
              valueOptions={[true, false]}
              register={register}
              error={errors.active?.message}
            />
          </div>
        </form>
        <div className={styles.containerButtons}>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => location.assign('/employee/home')}>Close</Button>
          <Button onClick={() => reset()}>Reset Form</Button>
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfile;
