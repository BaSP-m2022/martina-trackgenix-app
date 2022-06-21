import React, { useState } from 'react';
import styles from './employeeForm.module.css';
import Button from 'Components/Shared/Buttons/Buttons';
import Input from 'Components/Shared/Field/Input';
import RadioButton from 'Components/Shared/Field/RadioButton';
import { useDispatch } from 'react-redux/es/exports';
import { addEmployee, editEmployee } from 'redux/employees/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

const employeeSchema = Joi.object({
  first_name: Joi.string().min(3).max(15).required(),
  last_name: Joi.string().min(3).max(15).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().alphanum().min(8).max(20).required(),
  active: Joi.boolean()
});

const EmployeeForm = ({
  showForm,
  setShowForm,
  setShowModal,
  setChildrenModal,
  previewEmployee,
  setPreviewsEmployee
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const [userInput] = useState(previewEmployee);

  const cleanFields = () => {
    setPreviewsEmployee({
      id: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      active: ''
    });
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeeSchema),
    defaultValues: {
      first_name: previewEmployee.first_name,
      last_name: previewEmployee.last_name,
      phone: previewEmployee.phone,
      email: previewEmployee.email,
      password: previewEmployee.password,
      active: previewEmployee.active
    }
  });

  //const onChange = (e) => {
  //  setUserInput({ ...userInput, [e.target.name]: e.target.value });
  //};

  const onSubmit = async (data) => {
    if (!userInput._id) {
      const employeeResponse = await dispatch(addEmployee(data));
      if (employeeResponse.error) {
        setChildrenModal(employeeResponse.message);
        setShowModal(true);
      } else {
        closeForm();
        setChildrenModal('Employee added');
        setShowModal(true);
      }
    } else {
      const employeeResponse = await dispatch(editEmployee(data, userInput));
      if (employeeResponse.error) {
        setChildrenModal(employeeResponse.message);
        setShowModal(true);
      } else {
        closeForm();
        setChildrenModal('Employee edited');
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
        {!previewEmployee._id ? <h2>Add a new employee</h2> : <h2>Edit Employee</h2>}
        <Input
          type={'text'}
          name={'first_name'}
          label={'Name'}
          register={register}
          error={errors.first_name?.message}
        />
        <Input
          type={'text'}
          name={'last_name'}
          label={'Last Name'}
          register={register}
          error={errors.last_name?.message}
        />
        <Input
          type={'text'}
          name={'phone'}
          label={'Phone'}
          register={register}
          error={errors.phone?.message}
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
          name={'active'}
          label={'Active'}
          valueOptions={['true', 'false']}
          register={register}
          error={errors.active?.message}
        />
        <div className={styles.submitButton}>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()}>Reset Form</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
