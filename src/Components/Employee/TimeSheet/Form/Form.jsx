import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { addTimeSheet, editTimeSheet } from 'redux/timeSheets/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import styles from 'Components/Employee/TimeSheet/Form/form.module.css';
import Button from 'Components/Shared/Buttons/Buttons';
import Input from 'Components/Shared/Field/Input';

const Form = ({
  showForm,
  setShowForm,
  setShowModal,
  setChildrenModal,
  previousTimeSheet,
  setPreviousTimeSheet
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const schema = Joi.object({
    project: Joi.string().required().length(24).alphanum(),
    task: Joi.string().required().length(24).alphanum(),
    hsWorked: Joi.number().required(),
    timesheetDate: Joi.date().required().greater('01-01-1930').less('now')
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValue: {
      employee: previousTimeSheet.employee,
      project: previousTimeSheet.project,
      task: previousTimeSheet.task,
      hsWorked: previousTimeSheet.hs_worked,
      timesheetDate: previousTimeSheet.timesheetDate
    }
  });

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTasks());
    reset(previousTimeSheet);
  }, []);

  const projects = useSelector((state) => state.projects.list);
  const tasks = useSelector((state) => state.tasks.list);

  const filteredProjects = projects.filter(
    (projects) => projects.employees[0]?.id == previousTimeSheet.employee
  );

  const onSubmit = async (data) => {
    const projectName = filteredProjects.map((item) => {
      if (item._id == data.project) {
        return item.project_name;
      }
    });

    const taskDescription = tasks.map((item) => {
      if (item._id == data.task) {
        return item.description;
      }
    });

    const newTimeSheet = {
      _id: previousTimeSheet._id,
      employee: {
        _id: previousTimeSheet.employee,
        first_name: 'Homero'
      },
      project: {
        _id: data.project,
        project_name: projectName
      },
      task: {
        _id: data.task,
        description: taskDescription
      },
      hs_worked: data.hsWorked,
      timesheetDate: data.timesheetDate.toISOString()
    };

    if (!previousTimeSheet._id) {
      try {
        const timeSheetResponse = await dispatch(addTimeSheet(newTimeSheet));
        if (timeSheetResponse.error) {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const timeSheetResponse = await dispatch(editTimeSheet(newTimeSheet));
        if (timeSheetResponse.error) {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const closeForm = () => {
    setPreviousTimeSheet({
      _id: '',
      employee: previousTimeSheet.employee,
      hs_worked: 0,
      task: '',
      project: '',
      timesheetDate: ''
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Time-sheet</h2>
          <div>
            <Input
              type={'select'}
              name={'project'}
              register={register}
              valueOptions={filteredProjects}
              label={'Select a Project'}
              error={errors.project?.message}
            ></Input>
          </div>
          <div>
            <Input
              type={'select'}
              name={'task'}
              register={register}
              valueOptions={tasks}
              label={'Select a Task'}
              error={errors.task?.message}
            ></Input>
          </div>
          <div>
            <Input
              type={'number'}
              name={'hsWorked'}
              register={register}
              label={'Worked Hours'}
              error={errors.hsWorked?.message}
            ></Input>
          </div>
          <div>
            <Input
              type={'date'}
              name={'timesheetDate'}
              register={register}
              label={'DATE'}
              error={errors.timesheetDate?.message}
            ></Input>
          </div>
        </form>
        <div className={styles.button}>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()}>Reset Form</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
