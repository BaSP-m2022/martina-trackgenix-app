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

  const [listEmployeesStart, setListEmployeesStart] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployeesStart([...listEmployeesStart, ...data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [1]);

  const listEmployees = useSelector((state) => state.employees.list);

  const [newEmployeeList, setNewEmployeeList] = useState([]);
  const dispatch = useDispatch();

  const schema = joi.object({
    id: listEmployees.length === 0 ? '' : joi.string().required().length(24).alphanum(),
    role: joi.string().required().valid('DEV', 'PM', 'QA', 'TL'),
    rate: joi.number().required().min(1).max(999)
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

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
    if (listEmployees.length === 0) {
      alert('No more employees to add');
    } else {
      const newList = [...newEmployeeList, { id: data.id, role: data.role, rate: data.rate }];
      listEmployees.splice(
        listEmployees.indexOf(listEmployees.find((employee) => employee._id === data.id)),
        1
      );
      setNewEmployeeList(newList);
      reset({ rate: '1' });
    }
  };

  const handleDelete = (index) => {
    const newList = [...newEmployeeList];
    const spliced = newList.splice(index, 1);
    console.log('spliced', spliced);
    console.log('listemployeesstart', listEmployeesStart);
    const selectEmployee = listEmployeesStart.find((employee) => employee._id === spliced[0].id);
    listEmployees.push(selectEmployee);
    setNewEmployeeList(newList);
  };

  const onSubmit = () => {
    if (newEmployeeList.find((employee) => employee.role === 'PM')) {
      setShowSecondModal(false);
      sendNewEmployeeList(newEmployeeList);
    } else {
      alert("error: Your project doesn't have a Project Manager");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerFormEmployees}>
        <h2>Add employees</h2>
        <form className={styles.formEmployees} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Input
              type={'select'}
              name={'id'}
              label={'Select Employee'}
              selected={'Employee'}
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
              selected={'Role'}
              valueOptions={listRole}
              register={register}
              error={errors.role?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'number'}
              name={'rate'}
              label={'Select Employee RATE'}
              register={register}
              error={errors.rate?.message}
            />
          </div>
        </form>
        <div className={styles.containerTable}>
          <div>
            <Button width={'100px'} onClick={handleSubmit(handleAdd)}>
              Add employee
            </Button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Id', 'Role', 'Rate'].map((headersColumns, index) => {
                  return <th key={index}>{headersColumns}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {newEmployeeList.map((employee, index) => {
                return (
                  <tr key={employee.id} className={styles.tr}>
                    <td className={styles.td}>{employee.id}</td>
                    <td className={styles.td}>{employee.role}</td>
                    <td className={styles.td}>{employee.rate}</td>
                    <button onClick={() => handleDelete(index)}>x</button>
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
      </div>
    </div>
  );
};

export default EmployeeForm;
