import React, { useEffect } from 'react';
import styles from 'Components/Admin/Projects/Form/projectForm.module.css';
import Input from 'Components/Shared/Field/Input';
import Button from 'Components/Shared/Buttons/Buttons';
import RadioButton from 'Components/Shared/Field/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

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

  const schema = joi.object({
    projectName: joi.string().required().min(3).max(30),
    client: joi.string().required().min(3).max(30),
    startDate: joi.date().required().max('now'),
    finishDate: joi.date().required().min('now'),
    employee: joi.string().required().length(24).alphanum(),
    rate: joi.number().required().min(1).max(999),
    role: joi.string().required().valid('DEV', 'PM', 'QA', 'TL')
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
      projectName: previousProject.project_name,
      client: previousProject.client,
      startDate: previousProject.start_date,
      finishDate: previousProject.finish_date,
      active: previousProject.active,
      employee: previousProject.employees[0].id,
      role: previousProject.employees[0].role,
      rate: previousProject.employees[0].rate
    }
  });

  const onSubmit = async (data) => {
    if (!previousProject._id) {
      try {
        const project = await dispatch(addProject(data));
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
    } else {
      try {
        const project = await dispatch(editProject(data, previousProject._id));
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
          rate: 0
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
              name={'projectName'}
              label={'Project Name'}
              register={register}
              error={errors.projectName?.message}
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
              name={'startDate'}
              label={'Start Date'}
              register={register}
              error={errors.startDate?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'date'}
              name={'finishDate'}
              label={'Finish Date'}
              register={register}
              error={errors.finishDate?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <Input
              type={'select'}
              name={'employee'}
              label={'Select Employee ID'}
              valueOptions={listEmployees}
              register={register}
              error={errors.employee?.message}
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
              type={'number'}
              name={'rate'}
              label={'Select Employee RATE'}
              register={register}
              error={errors.rate?.message}
            />
          </div>
          <div className={styles.containerInput}>
            <RadioButton
              name={'active'}
              label={'Active'}
              valueOptions={[true, false]}
              register={register}
              error={errors.active?.message}
            />
          </div>
          <div className={styles.containerButtons}>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            <Button onClick={() => reset()}>Reset Form</Button>
            <Button onClick={closeForm}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
