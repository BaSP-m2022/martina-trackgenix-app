import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';

const EmployeeForm = ({ showSecondModal, setShowSecondModal }) => {
  if (!showSecondModal) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [selectState, setSelectState] = useState([
    {
      first_name: '',
      last_name: '',
      role: '',
      rate: ''
    }
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
    // defaultValues: {
    //   employee: previousProject.employees[0].id,
    //   role: previousProject.employees[0].role,
    //   rate: previousProject.employees[0].rate
    // }
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

  const handleAdd = (e) => {
    e.preventDefault();
    setSelectState({
      name: selectState.selectedName,
      role: selectState.role,
      rate: selectState.rate
    });
  };

  const onSubmit = (data) => {
    console.log(data);
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
                const selectedName = e.target.value;
                setSelectState(selectedName);
                console.log(selectedName);
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
                const selectedRole = e.target.value;
                setSelectState(selectedRole);
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
                const selectedRate = e.target.value;
                setSelectState(selectedRate);
              }}
            />
            <input type={'button'} value={'Add'} onClick={handleAdd} />
            <table>
              <thead>
                <tr>
                  {['Name', 'Role', 'Rate'].map((headersColumns, index) => {
                    return <th key={index}>{headersColumns}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {selectState.map((employee) => {
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
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            <Button onClick={() => setShowSecondModal(false)}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
