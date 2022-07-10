/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';

const EmployeeForm = ({ showSecondModal, setShowSecondModal, previousProject }) => {
  if (!showSecondModal) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [selectState, setSelectState] = useState([
    {
      name: '',
      role: '',
      rate: ''
    }
  ]);
  const [newEmployeeList, setNewEmployeeList] = useState([]);

  const schema = joi.object({
    employee: joi.string().required().length(24).alphanum(),
    rate: joi.number().required().min(1).max(999),
    role: joi.string().required().valid('DEV', 'PM', 'QA', 'TL')
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      employee: previousProject.employees[0].id,
      role: previousProject.employees[0].role,
      rate: previousProject.employees[0].rate
    }
  });

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployees([...listEmployees, ...data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const listRole = [
    {
      _id: 'DEV',
      description: 'Developer'
    },
    {
      _id: 'QA',
      description: 'Quality Assurance'
    },
    {
      _id: 'PM',
      description: 'Project Manager'
    },
    {
      _id: 'TL',
      description: 'Team Leader'
    }
  ];

  const handleAdd = (data) => {
    const newList = [...newEmployeeList, { name: data.employee, role: data.role, rate: data.rate }];
    setNewEmployeeList(newList);
    console.log('newlist', newList);
  };

  const onSubmit = () => {
    newEmployeeList.find((employee) => employee.role === 'PM')
      ? setShowSecondModal(false)
      : alert('Please select a Project Manager');
    console.log(selectState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h2>Add employees</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Input
              type={'select'}
              name={'employee'}
              label={'Select Employee'}
              valueOptions={listEmployees}
              register={register}
              error={errors.employee?.message}
              onChange={(e) => {
                setSelectState(e.target.value);
              }}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'select'}
              name={'role'}
              label={'Select Employee ROLE'}
              valueOptions={listRole}
              register={register}
              error={errors.role?.message}
              onChange={(e) => {
                setSelectState(e.target.value);
              }}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'number'}
              name={'rate'}
              label={'Select Employee RATE'}
              register={register}
              error={errors.rate?.message}
              onChange={(e) => {
                setSelectState(e.target.value);
              }}
            />
          </div>
          <div>
            <div>
              <Button onClick={handleSubmit(handleAdd)}>Add</Button>
            </div>
            <table>
              <thead>
                <tr>
                  {['Name', 'Role', 'Rate'].map((headersColumns, index) => {
                    return <th key={index}>{headersColumns}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {newEmployeeList.map((employee) => {
                  return (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.role}</td>
                      <td>{employee.rate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.containerButtons}>
            <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
            <Button onClick={() => setShowSecondModal(false)}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
