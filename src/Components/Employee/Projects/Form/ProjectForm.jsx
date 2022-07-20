import React, { useState, useEffect } from 'react';
import styles from 'Components/Employee/Projects/Form/projectForm.module.css';
import { Table, Button, Input } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { editProject } from 'redux/projects/thunks';
import { useForm } from 'react-hook-form';
import EmployeeForm from 'Components/Employee/Projects/Form/EmployeeForm';

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

  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [members, setMembers] = useState([
    {
      id: '',
      name: '',
      role: '',
      rate: 0,
      _id: ''
    }
  ]);

  console.log('previousProject: ', previousProject);

  useEffect(() => {
    const newEmployees = previousProject.employees.map((employee) => {
      return {
        id: employee.id._id,
        name: employee.id.first_name + ' ' + employee.id.last_name,
        role: employee.role,
        rate: employee.rate,
        _id: employee._id
      };
    });
    setMembers(newEmployees);
  }, []);

  const { handleSubmit, register } = useForm({
    mode: 'onChange',
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
    console.log('_id en delete: ', _id);
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
              disabled
            />
          </div>
          <div className={styles.containerInput}>
            <Input type={'text'} name={'client'} label={'Client'} register={register} disabled />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'start_date'}
              label={'Start Date'}
              register={register}
              disabled
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'finish_date'}
              label={'Finish Date'}
              register={register}
              disabled
            />
          </div>
        </form>
        <Table
          title={`Employees`}
          data={members}
          headersColumns={['Name', 'Role', 'Rate', '']}
          headers={['name', 'role', 'rate']}
          deleteItem={deleteEmployee}
        />
        <div className={styles.containerButtons}>
          <Button width={'120px'} height={'40px'} onClick={() => setShowEmployeeForm(true)}>
            Add employees
          </Button>
          <Button width={'120px'} height={'40px'} onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>
      <EmployeeForm
        showEmployeeForm={showEmployeeForm}
        setShowEmployeeForm={setShowEmployeeForm}
        members={members}
        setMembers={setMembers}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
      />
    </div>
  );
};

export default ProjectForm;
