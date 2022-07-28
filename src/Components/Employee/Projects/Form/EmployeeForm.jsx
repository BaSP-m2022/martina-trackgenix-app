import React from 'react';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import { Button, Input } from 'Components/Shared';
import { useSelector } from 'react-redux';

const EmployeeForm = ({
  showEmployeeForm,
  setShowEmployeeForm,
  members,
  setMembers,
  setShowModal,
  setTitleModal
}) => {
  if (!showEmployeeForm) {
    return null;
  }

  const schema = joi.object({
    id: joi.string().required().length(24).alphanum(),
    role: joi.string().required().valid('DEV', 'PM', 'QA', 'TL'),
    rate: joi.number().min(1).required()
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

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
      _id: 'TL',
      description: 'Team Leader'
    }
  ];

  const onSubmit = async (data) => {
    if (members.find((member) => member.id == data.id)) {
      setShowModal(true);
      setTitleModal('This employee is already assigned to this project, please select another one');
    } else {
      const employeeFound = listEmployees.find((employee) => employee._id == data.id);
      setMembers([
        ...members,
        {
          id: data.id,
          name: employeeFound.first_name + ' ' + employeeFound.last_name,
          role: data.role,
          rate: data.rate
        }
      ]);
      setShowEmployeeForm(false);
    }
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
          <div className={styles.containerButtons}>
            <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
            <Button onClick={() => setShowEmployeeForm(false)}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
