import React, { useState, useEffect } from 'react';
import styles from './addTimeSheet.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';

const AddTimeSheet = ({
  showFormAdd,
  setShowFormAdd,
  setShowModal,
  setChildrenModal,
  newItem,
  setLoading
}) => {
  if (!showFormAdd) {
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

  const employeeName = listEmployees.map((item) => {
    if (item._id == employeeId) {
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
    if (item._id == projectId) {
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
    if (item._id == taskId) {
      return item.description;
    }
  });

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
      if (!response.ok) {
        setShowModal(true);
        setChildrenModal('Error. Can not create time-sheet');
        setShowFormAdd(false);
      } else {
        setShowModal(true);
        setChildrenModal(res.message);
        newItem(newBody);
        setShowFormAdd(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
        <div>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        </div>
        <div>
          <Button onClick={() => setShowFormAdd(false)}>x</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTimeSheet;
