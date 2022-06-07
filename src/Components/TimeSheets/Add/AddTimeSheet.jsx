import React, { useState, useEffect } from 'react';
import styles from './addTimeSheet.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';
// import Modal from '../../Shared/Modal/Modal';

const AddTimeSheet = ({
  show,
  closeForm,
  setShowModal,
  setTitleModal,
  newTimeSheet,
  setLoading
}) => {
  if (!show) {
    return null;
  }

  const [listEmployees, setListEmployees] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTasks, setListTasks] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [hsWorked, setHSWorked] = useState(0);
  const [date, setDate] = useState('');

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

  console.log(listEmployees);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const postTS = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        employee: employeeId,
        project: projectId,
        task: taskId,
        hs_worked: hsWorked,
        timesheetDate: date
      })
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheet`, postTS);
      const res = await response.json();
      if (!response.ok) {
        setShowModal(true);
        setTitleModal('Error. Can not create time-sheet');
        setLoading(false);
      } else {
        setShowModal(true);
        setTitleModal(res.message);
        newTimeSheet(res.data);
        closeForm(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new Time-sheet</h2>
        <div>
          <Input
            type={'select'}
            name={'employee'}
            onChange={(e) => setEmployeeId(e.target.value)}
            valueOptions={listEmployees}
            label={'Select an Employee'}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'project'}
            onChange={(e) => setProjectId(e.target.value)}
            valueOptions={listProjects}
            label={'Select a Project'}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'task'}
            onChange={(e) => setTaskId(e.target.value)}
            valueOptions={listTasks}
            label={'Select a Task'}
          ></Input>
        </div>
        <div>
          <label>Hours worked</label>
          <input
            type="number"
            name="hs_worked"
            value={hsWorked}
            onChange={(e) => setHSWorked(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="timesheetDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div className={styles.submitButton}>
          <input type="submit" value="Submit"></input>
        </div>
        <Button onClick={closeForm}>x</Button>
      </form>
    </div>
  );
};

export default AddTimeSheet;
