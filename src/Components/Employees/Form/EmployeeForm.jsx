import React, { useState } from 'react';
import styles from './employeeForm.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addEmployee, editEmployee } from '../../../redux/employees/thunks';

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
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);

  const [userInput, setUserInput] = useState(previewEmployee);

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

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  if (error) {
    setChildrenModal(message);
    setShowModal(true);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userInput._id) {
      const employeeResponse = await dispatch(addEmployee(userInput));
      if (employeeResponse.error) {
        setChildrenModal(employeeResponse.message);
        setShowModal(true);
      } else {
        closeForm();
        setChildrenModal('Employee added');
        setShowModal(true);
      }
    } else {
      const employeeResponse = await dispatch(editEmployee(userInput));
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
      <form onSubmit={onSubmit}>
        <h2>Add new Employee</h2>
        <div>
          <Input
            type={'text'}
            name={'first_name'}
            value={userInput.first_name}
            onChange={onChange}
            label={'Name'}
          />
        </div>
        <div>
          <Input
            type={'text'}
            name={'last_name'}
            value={userInput.last_name}
            onChange={onChange}
            label={'Last Name'}
          />
        </div>
        <div>
          <Input
            type={'text'}
            name={'phone'}
            value={userInput.phone}
            onChange={onChange}
            label={'Phone'}
          />
        </div>
        <div>
          <Input
            type={'text'}
            name={'email'}
            value={userInput.email}
            onChange={onChange}
            label={'Email'}
          />
        </div>
        <div>
          <Input
            type={'password'}
            name={'password'}
            value={userInput.password}
            onChange={onChange}
            label={'Password'}
          />
        </div>
        <div>
          <RadioButton
            name={'active'}
            label={'Active'}
            value={['true', 'false']}
            onChange={onChange}
          />
        </div>
        <div className={styles.submitButton}>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
