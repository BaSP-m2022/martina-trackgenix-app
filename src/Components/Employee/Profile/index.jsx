import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'Components/Employee/Profile/profile.modules.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import RadioButton from 'Components/Shared/Field/RadioButton';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { getEmployees } from 'redux/employees/thunks';

const EmployeeProfile = () => {
  const [list] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, []);
  const employeeId = '629d41966737e327d3189242';
  let listEmployee = useSelector((state) => state.employees.list);
  listEmployee = listEmployee.find((employee) => employee._id == employeeId);
  const schema = joi.object({
    first_name: joi.string().min(3).max(30).required(),
    last_name: joi.string().min(3).max(30).required(),
    phone: joi.number().min(7).required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().min(6).required(),
    active: joi.boolean().required()
  });
  console.log(listEmployee);
  console.log('Employee:', listEmployee);
  const {
    // handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),

    defaultValues: {
      first_name: listEmployee?.first_name,
      last_name: listEmployee?.last_name,
      phone: listEmployee?.phone,
      email: listEmployee?.email,
      password: listEmployee?.password,
      active: listEmployee?.active
    }
  });
  console.log('list:', list);
  return (
    <div className={styles.container}>
      <form>
        <h2>Profile</h2>
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
        <div className={styles.submitButton}>
          <Button /*onClick={(e) => onSubmit(e)}*/>Submit</Button>
          <Button onClick={() => reset}>Reset Form</Button>
          <Button /*onClick={closeForm}*/>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeProfile;
