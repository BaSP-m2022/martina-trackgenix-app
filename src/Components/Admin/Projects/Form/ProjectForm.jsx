import React, { useState } from 'react';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import { useDispatch } from 'react-redux';
import { addProject, editProject } from 'redux/projects/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import EmployeeAdd from 'Components/Admin/Projects/Form/EmployeeForm';

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

  const [showSecondModal, setShowSecondModal] = useState(false);
  const [newEmployeeList, setNewEmployeeList] = useState([]);

  const sendNewEmployeeList = (list) => {
    setNewEmployeeList(list);
  };

  const schema = joi.object({
    project_name: joi.string().required().min(3).max(30),
    client: joi.string().required().min(3).max(30),
    start_date: joi.date().required().max('now'),
    finish_date: joi.date().required().min('now')
  });

  const {
    handleSubmit,
    register,
    reset,
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

  console.log('previousprojectProjectForm', previousProject);

  const onSubmit = async (data) => {
    if (!previousProject._id) {
      try {
        if (newEmployeeList.length === 0) {
          alert('Error: please add employees to your project');
        } else {
          const project = await dispatch(addProject(newEmployeeList, data));
          if (project.error) {
            setTitleModal(project.message);
            setShowModal(true);
          } else {
            setTitleModal(project.message);
            setShowModal(true);
            closeForm();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        newEmployeeList.length > 1 ? (previousProject.employees = []) : '';
        console.log('previousproject', previousProject.employees);
        console.log('newemployeelist', newEmployeeList);
        if (newEmployeeList.length < 0) {
          alert('Error: please add employees to the project');
        } else {
          const project = await dispatch(
            editProject(
              data,
              previousProject._id,
              previousProject.employees.length <= 1 ||
                previousProject.employees.length < newEmployeeList.length
                ? newEmployeeList.map((employees) => {
                    return {
                      id: employees.id,
                      role: employees.role,
                      rate: employees.rate
                    };
                  })
                : previousProject.employees.map((employees) => {
                    return {
                      id: employees.id,
                      role: employees.role,
                      rate: employees.rate
                    };
                  })
            )
          );
          if (project.error) {
            alert(project.message);
          } else {
            setTitleModal(project.message);
            setShowModal(true);
            closeForm();
          }
        }
      } catch (error) {
        console.error(error);
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
      active: '',
      employees: [
        {
          id: '',
          role: '',
          rate: ''
        }
      ]
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h2>Project Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'project_name'}
              label={'Project Name'}
              register={register}
              error={errors.project_name?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'text'}
              name={'client'}
              label={'Client'}
              register={register}
              error={errors.client?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'start_date'}
              label={'Start Date'}
              register={register}
              error={errors.start_date?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'finish_date'}
              label={'Finish Date'}
              register={register}
              error={errors.finish_date?.message}
            />
          </div>
        </form>
        <div className={styles.containerTable}>
          <div>
            {!previousProject._id ? (
              <Button width={'120px'} onClick={() => setShowSecondModal(true)}>
                Add employees
              </Button>
            ) : (
              <Button
                width={'120px'}
                onClick={() => {
                  setShowSecondModal(true);
                  if (previousProject.employees.length > newEmployeeList.length) {
                    setNewEmployeeList(previousProject.employees);
                  } else {
                    setNewEmployeeList(newEmployeeList);
                  }
                }}
              >
                Edit employees
              </Button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                {['ID', 'Role', 'Rate'].map((headersColumns, index) => {
                  return <th key={index}>{headersColumns}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {newEmployeeList.length > 1
                ? newEmployeeList.map((employee) => {
                    return (
                      <tr key={employee.id} className={styles.tr}>
                        <td className={styles.td}>{employee.id}</td>
                        <td className={styles.td}>{employee.role}</td>
                        <td className={styles.td}>{employee.rate}</td>
                      </tr>
                    );
                  })
                : previousProject.employees.map((employee) => {
                    return (
                      <tr key={employee.id} className={styles.tr}>
                        <td className={styles.td}>{employee.id}</td>
                        <td className={styles.td}>{employee.role}</td>
                        <td className={styles.td}>{employee.rate}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <div className={styles.containerButtons}>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()}>Reset Form</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </div>
      <EmployeeAdd
        showSecondModal={showSecondModal}
        setShowSecondModal={setShowSecondModal}
        previousProject={previousProject}
        sendNewEmployeeList={sendNewEmployeeList}
        newEmployeeListReturn={newEmployeeList}
      />
    </div>
  );
};

export default ProjectForm;
