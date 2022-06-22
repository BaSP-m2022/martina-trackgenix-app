import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTimeSheet, editTimeSheet } from 'redux/timeSheets/thunks';
import styles from 'Components/SuperAdmin/TimeSheets/Form/FormTimeSheet.module.css';
import Button from 'Components/Shared/Buttons/Buttons';
import Input from 'Components/Shared/Field/Input';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

const FormTimeSheet = ({
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
    employee: Joi.string().required().length(24).alphanum(),
    project: Joi.string().required().length(24).alphanum(),
    task: Joi.string().required().length(24).alphanum(),
    hsWorked: Joi.number().required(),
    timesheetDate: Joi.date().required().greater('01-01-1950').less('now')
  });
  const [listEmployees, setListEmployees] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTasks, setListTasks] = useState([]);

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
  console.log('previous TimeSheet: ', previousTimeSheet);
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployees(...listEmployees, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setListProjects(...listProjects, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setListTasks(...listTasks, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    const employeeName = listEmployees.map((item) => {
      if (item._id == data.employee) {
        return item.first_name;
      }
    });
    const projectName = listProjects.map((item) => {
      if (item._id == data.project) {
        return item.project_name;
      }
    });
    const taskDescription = listTasks.map((item) => {
      if (item._id == data.task) {
        return item.description;
      }
    });

    const newTimeSheet = {
      _id: previousTimeSheet._id,
      employee: {
        _id: data.employee,
        first_name: employeeName
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
      timesheetDate: data.timesheetDate.toString()
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
      employee: '',
      hs_worked: 0,
      task: '',
      project: '',
      timesheetDate: ''
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit time-sheet</h2>
        <div>
          <Input
            type={'select'}
            name={'employee'}
            register={register}
            valueOptions={listEmployees}
            label={'Select an Employee'}
            error={errors.employee?.message}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'project'}
            register={register}
            valueOptions={listProjects}
            label={'Select a Project'}
            error={errors.project?.message}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'task'}
            register={register}
            valueOptions={listTasks}
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
        <div className={styles.button}>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()}>Reset Form</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTimeSheet;
