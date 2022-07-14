import React, { useState, useEffect } from 'react';
import styles from 'Components/Employee/Projects/Form/projectForm.module.css';
import { Table, Button, Input } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { editProject } from 'redux/projects/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import EmployeeAdd from 'Components/Employee/Projects/Form/EmployeeForm';

const ProjectForm = ({
  showForm,
  setShowForm,
  previousProject,
  setPreviousProject,
  setShowModal,
  setTitleModal
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const [showFormAdd, setShowFormAdd] = useState(false);
  const [members, setMembers] = useState([
    {
      id: '',
      role: '',
      rate: 0,
      _id: ''
    }
  ]);

  useEffect(() => {
    setMembers(previousProject.employees);
  }, []);

  const schema = joi.object({
    project_name: joi.string().required().min(3).max(30),
    client: joi.string().required().min(3).max(30),
    start_date: joi.date().required().max('now'),
    finish_date: joi.date().required().min('now')
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      project_name: previousProject.project_name,
      client: previousProject.client,
      start_date: previousProject.start_date,
      finish_date: previousProject.finish_date
    }
  });

  const onSubmit = async (data) => {
    const newMembers = members.map((member) => {
      return {
        id: member.id,
        role: member.role,
        rate: member.rate
      };
    });
    try {
      const project = await dispatch(editProject(data, newMembers, previousProject._id));
      if (project.error) {
        setTitleModal(project.message);
        setShowModal(true);
      } else {
        setTitleModal(project.message);
        setShowModal(true);
        closeForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = (_id) => {
    const memberDelete = members.find((member) => member._id == _id);
    if (memberDelete.role == 'PM') {
      setTitleModal('You cannot delete PM');
      setShowModal(true);
    } else {
      if (confirm('Are you sure you want to remove this member?')) {
        const newMembers = members.filter((member) => member._id !== _id);
        setMembers(newMembers);
      }
    }
  };

  const closeForm = () => {
    setPreviousProject({
      _id: '',
      project_name: '',
      client: '',
      start_date: '',
      finish_date: '',
      active: true,
      employees: [
        {
          id: '',
          role: '',
          rate: 0
        }
      ]
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <div className={styles.btnX} onClick={closeForm}>
          X
        </div>
        <h2>Project Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'project_name'}
              label={'Project Name'}
              register={register}
              error={errors.project_name?.message}
              disabled
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'client'}
              label={'Client'}
              register={register}
              error={errors.client?.message}
              disabled
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'start_date'}
              label={'Start Date'}
              register={register}
              error={errors.start_date?.message}
              disabled
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'finish_date'}
              label={'Finish Date'}
              register={register}
              error={errors.finish_date?.message}
              disabled
            />
          </div>
        </form>
        <Table
          title={`Employees`}
          data={members}
          headersColumns={['Id', 'Role', 'Rate', '']}
          headers={['id', 'role', 'rate']}
          deleteItem={deleteEmployee}
        />
        <div className={styles.containerButtons}>
          <Button width={'120px'} height={'40px'} onClick={() => setShowFormAdd(true)}>
            Add employees
          </Button>
          <Button width={'120px'} height={'40px'} onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>
      <EmployeeAdd
        showFormAdd={showFormAdd}
        setShowFormAdd={setShowFormAdd}
        members={members}
        setMembers={setMembers}
      />
    </div>
  );
};

export default ProjectForm;
