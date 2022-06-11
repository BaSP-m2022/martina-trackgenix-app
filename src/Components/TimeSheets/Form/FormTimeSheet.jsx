import React, { useState, useEffect } from 'react';
import styles from './FormTimeSheet.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';

const FormTimeSheet = ({
  addItem,
  showForm,
  setShowForm,
  setShowModal,
  setChildrenModal,
  setLoading,
  editItem,
  previousTimeSheet,
  setPreviousTimeSheet,
  method
}) => {
  if (!showForm) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTasks, setListTasks] = useState([]);
  const [employee, setEmployee] = useState(previousTimeSheet.employee);
  const [project, setProject] = useState(previousTimeSheet.project);
  const [task, setTask] = useState(previousTimeSheet.task);
  const [hsWorked, setHSWorked] = useState(previousTimeSheet.hs_worked);
  const [date, setDate] = useState(previousTimeSheet.date);
  const timeSheetId = previousTimeSheet._id;

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

  const employeeName = listEmployees.map((item) => {
    if (item._id == employee) {
      return item.first_name;
    }
  });

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

  const projectName = listProjects.map((item) => {
    if (item._id == project) {
      return item.project_name;
    }
  });

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

  const taskDescription = listTasks.map((item) => {
    if (item._id == task) {
      return item.description;
    }
  });

  const cleanFields = () => {
    setPreviousTimeSheet({
      _id: '',
      employee: '',
      hs_worked: 0,
      task: '',
      project: '',
      timesheetDate: ''
    });
  };

  const fetchData = async (url, methodFunction) => {
    const options = {
      method: method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        employee: employee,
        project: project,
        task: task,
        hs_worked: hsWorked,
        timesheetDate: date
      })
    };

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      const newBody = {
        _id: res.data._id,
        employee: {
          _id: res.data.employee,
          first_name: employeeName
        },
        project: {
          _id: res.data.project,
          project_name: projectName
        },
        task: {
          _id: res.data.task,
          description: taskDescription
        },
        hs_worked: res.data.hs_worked,
        timesheetDate: res.data.timesheetDate
      };
      if (response.status !== 201 && response.status !== 200) {
        setShowForm(false);
        setShowModal(true);
        setChildrenModal(res.message);
      } else {
        setShowForm(false);
        setShowModal(true);
        setChildrenModal(res.message);
        methodFunction(newBody);
        cleanFields();
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!timeSheetId) {
      const url = `${process.env.REACT_APP_API_URL}/time-sheet`;
      fetchData(url, addItem);
    } else {
      const url = `${process.env.REACT_APP_API_URL}/time-sheet/${timeSheetId}`;
      fetchData(url, editItem);
    }
  };

  const closeForm = () => {
    cleanFields();
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit time-sheet</h2>
        <div>
          <Input
            type={'select'}
            name={'employee'}
            onChange={(e) => setEmployee(e.target.value)}
            valueOptions={listEmployees}
            value={employee}
            label={'Select an Employee'}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'project'}
            onChange={(e) => setProject(e.target.value)}
            valueOptions={listProjects}
            label={'Select a Project'}
            value={project}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'task'}
            onChange={(e) => setTask(e.target.value)}
            valueOptions={listTasks}
            label={'Select a Task'}
            value={task}
          ></Input>
        </div>
        <div>
          <Input
            type="number"
            name="hs_worked"
            value={hsWorked}
            onChange={(e) => setHSWorked(e.target.value)}
            label={'Worked Hours'}
          ></Input>
        </div>
        <div>
          <Input
            type="date"
            name="timesheetDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label={'DATE'}
          ></Input>
        </div>
        <div className={styles.button}>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTimeSheet;