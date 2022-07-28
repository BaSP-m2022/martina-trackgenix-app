import React, { useState, useEffect } from 'react';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject } from 'redux/projects/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import EmployeeAdd from 'Components/Admin/Projects/Form/EmployeeForm';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import Modal from 'Components/Shared/Modal/Modal';

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

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const listEmployees = useSelector((state) => state.employees.list);

  const dispatch = useDispatch();

  const [showSecondModal, setShowSecondModal] = useState(false);
  const [newEmployeeList, setNewEmployeeList] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [titleMessageModal, setTitleMessageModal] = useState('');

  const sendNewEmployeeList = (list) => {
    setNewEmployeeList(list);
  };

  const schema = joi.object({
    project_name: joi
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z_ ]*$/)
      .messages({
        'string.pattern.base': 'Project Name must contain only letters'
      })
      .required(),
    client: joi
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z_ ]*$/)
      .messages({
        'string.pattern.base': 'Client must contain only letters'
      })
      .required(),
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

  const onSubmit = async (data) => {
    if (!previousProject._id) {
      try {
        if (newEmployeeList.length === 0) {
          setShowMessageModal(true);
          setTitleMessageModal('error: please add employees to your project');
        } else {
          const project = await dispatch(
            addProject(
              data,
              newEmployeeList.map((employee) => {
                return {
                  id: employee.id._id,
                  role: employee.role,
                  rate: employee.rate
                };
              })
            )
          );
          if (project.error) {
            setTitleModal(project.message);
            setShowModal(true);
          } else {
            setTitleModal(project.message);
            setShowModal(true);
            dispatch(getProjects());
            closeForm();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        newEmployeeList.length > 1 ? (previousProject.employees = []) : '';
        if (previousProject.employees.length < 0) {
          setShowMessageModal(true);
          setTitleMessageModal('error: please add employees to the project');
        } else {
          const project = await dispatch(
            editProject(
              data,
              previousProject._id,
              previousProject.employees.length <= 1 || newEmployeeList.length > 1
                ? newEmployeeList.map((employees) => {
                    return {
                      id: employees.id._id,
                      role: employees.role,
                      rate: employees.rate
                    };
                  })
                : previousProject.employees.map((employees) => {
                    return {
                      id: employees.id._id,
                      role: employees.role,
                      rate: employees.rate
                    };
                  })
            )
          );
          if (project.error) {
            console.error(project.message);
          } else {
            setTitleModal(project.message);
            setShowModal(true);
            dispatch(getProjects());
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
    reset();
  };

  return (
    <div className={styles.container}>
      {previousProject._id && previousProject.active == false ? (
        <div className={styles.containerForm}>
          <div onClick={closeForm} className={styles.btnX}>
            X
          </div>
          <h2>Project Form</h2>
          <div>This project has been deactivated</div>
          <form>
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
          <div className={styles.containerTable}>
            <table>
              <thead>
                <tr>
                  {['Name', 'Role', 'Rate'].map((headersColumns, index) => {
                    return <th key={index}>{headersColumns}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {previousProject.employees.map((employees) => {
                  return (
                    <tr key={employees.id} className={styles.tr}>
                      <td className={styles.td}>
                        {employees.id.first_name + ' ' + employees.id.last_name}
                      </td>
                      <td className={styles.td}>{employees.role}</td>
                      <td className={styles.td}>{employees.rate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.containerForm}>
          <div onClick={closeForm} className={styles.btnX}>
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
                    if (previousProject.employees.length <= 1 || newEmployeeList.length > 1) {
                      setNewEmployeeList(newEmployeeList);
                    } else {
                      setNewEmployeeList(previousProject.employees);
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
                  {['Name', 'Role', 'Rate'].map((headersColumns, index) => {
                    return <th key={index}>{headersColumns}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {newEmployeeList.length > 1 || previousProject.employees.length <= 1 ? (
                  newEmployeeList.map((employees) => {
                    return listEmployees.find((employee) => employees.id._id === employee._id);
                  })[0] == undefined ? (
                    <span>No employees yet</span>
                  ) : (
                    newEmployeeList.map((employees) => {
                      return (
                        <tr key={employees.id} className={styles.tr}>
                          <td>
                            {listEmployees.find((item) => employees.id._id === item._id)
                              .first_name +
                              ' ' +
                              listEmployees.find((item) => employees.id._id === item._id).last_name}
                          </td>
                          <td className={styles.td}>{employees.role}</td>
                          <td className={styles.td}>{employees.rate}</td>
                        </tr>
                      );
                    })
                  )
                ) : (
                  previousProject.employees.map((employees) => {
                    return (
                      <tr key={employees.id} className={styles.tr}>
                        <td className={styles.td}>
                          {employees.id.first_name + ' ' + employees.id.last_name}
                        </td>
                        <td className={styles.td}>{employees.role}</td>
                        <td className={styles.td}>{employees.rate}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.containerButtons}>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </div>
        </div>
      )}
      <EmployeeAdd
        showSecondModal={showSecondModal}
        setShowSecondModal={setShowSecondModal}
        previousProject={previousProject}
        sendNewEmployeeList={sendNewEmployeeList}
        newEmployeeListReturn={newEmployeeList}
        setTitleMessageModal={setTitleMessageModal}
        setShowMessageModal={setShowMessageModal}
      />
      <Modal isOpen={showMessageModal} handleClose={() => setShowMessageModal(false)}>
        {titleMessageModal}
      </Modal>
    </div>
  );
};

export default ProjectForm;
