import React, { useState, useEffect } from 'react';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';

const EmployeeForm = ({
  showSecondModal,
  setShowSecondModal,
  // previousProject,
  sendNewEmployeeList
}) => {
  if (!showSecondModal) {
    return null;
  }

  const [newEmployeeList, setNewEmployeeList] = useState([]);
  const dispatch = useDispatch();

  const schema = joi.object({
    id: joi.string().required().length(24).alphanum(),
    role: joi.string().required().valid('DEV', 'PM', 'QA', 'TL'),
    rate: joi.string().required()
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
    // defaultValues: {
    //   // id: previousProject.employees[0].id,
    //   // role: previousProject.employees[0].role,
    //   // rate: previousProject.employees[0].rate
    // }
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const listEmployees = useSelector((state) => state.employees.list);

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
    const newList = [...newEmployeeList, { id: data.id, role: data.role, rate: data.rate }];
    setNewEmployeeList(newList);
  };

  const onSubmit = () => {
    newEmployeeList.find((employee) => employee.role === 'PM')
      ? setShowSecondModal(false)
      : alert('Please select a Project Manager');
    sendNewEmployeeList(newEmployeeList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h2>Add employees</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Input
              type={'select'}
              name={'id'}
              label={'Select Employee'}
              valueOptions={listEmployees}
              register={register}
              error={errors.id?.message}
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
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'rate'}
              label={'Select Employee RATE'}
              register={register}
              error={errors.rate?.message}
            />
          </div>
          <div>
            <div>
              <Button onClick={handleSubmit(handleAdd)}>Add</Button>
            </div>
            <table>
              <thead>
                <tr>
                  {['Id', 'Role', 'Rate'].map((headersColumns, index) => {
                    return <th key={index}>{headersColumns}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {newEmployeeList.map((employee) => {
                  return (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
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
