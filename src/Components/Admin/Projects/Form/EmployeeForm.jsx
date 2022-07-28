import React, { useState, useEffect } from 'react';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import { Input, Button } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';

const EmployeeForm = ({
  showSecondModal,
  setShowSecondModal,
  sendNewEmployeeList,
  newEmployeeListReturn,
  setShowMessageModal,
  setTitleMessageModal
}) => {
  if (!showSecondModal) {
    return null;
  }
  useEffect(() => {
    dispatch(getEmployees());
    newEmployeeListReturn.length > 1 ? setNewEmployeeList(newEmployeeListReturn) : '';
  }, []);

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
      setShowMessageModal(true);
      setTitleMessageModal('Error: No more employees to add or no employees in data base');
    } else {
      const newList = [
        ...newEmployeeList,
        { id: { _id: data.id }, role: data.role, rate: data.rate }
      ];
      if (newEmployeeList.find((employee) => employee.id._id === data.id)) {
        setShowMessageModal(true);
        setTitleMessageModal("Error: Can't add the same employee twice");
      } else {
        setNewEmployeeList(newList);
      }
    }
  };

  const handleDelete = (index) => {
    const newList = [...newEmployeeList];
    newList.splice(index, 1);
    setNewEmployeeList(newList);
  };

  const onSubmit = () => {
    if (newEmployeeList.length <= 1) {
      setShowMessageModal(true);
      setTitleMessageModal('Error: Your project must have at least 2 employees');
    } else if (newEmployeeList.find((employee) => employee.role === 'PM')) {
      setShowSecondModal(false);
      sendNewEmployeeList(newEmployeeList);
    } else {
      setShowMessageModal(true);
      setTitleMessageModal("Error: Your project doesn't have a Project Manager");
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
                {['Name', 'Role', 'Rate'].map((headersColumns, index) => {
                  return <th key={index}>{headersColumns}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {newEmployeeList.map((employees) => {
                return listEmployees.find(
                  (employee) => employees.id._id || employees.id === employee._id
                );
              })[0] == undefined
                ? ''
                : newEmployeeList.map((employees, index) => {
                    return (
                      <tr key={employees.id} className={styles.tr}>
                        <td>
                          {listEmployees.find((item) => employees.id._id === item._id).first_name +
                            ' ' +
                            listEmployees.find((item) => employees.id._id === item._id).last_name}
                        </td>
                        <td className={styles.td}>{employees.role}</td>
                        <td className={styles.td}>{employees.rate}</td>
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
