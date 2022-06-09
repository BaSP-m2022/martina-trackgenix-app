import React, { useState, useEffect } from 'react';
import styles from './editTimeSheet.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';

const EditTimeSheet = ({
  showFormEdit,
  setShowFormEdit,
  previewTimeSheet,
  setShowModal,
  setChildrenModal,
  editItem
  // setLoading
}) => {
  if (!showFormEdit) {
    return null;
  }

  const [listEmployees, setListEmployees] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTasks, setListTasks] = useState([]);
  const [employeeId, setEmployeeId] = useState(previewTimeSheet.employee._id);
  const [projectId, setProjectId] = useState(previewTimeSheet.project._id);
  const [taskId, setTaskId] = useState(previewTimeSheet.task._id);
  const [hsWorked, setHSWorked] = useState(previewTimeSheet.hs_worked);
  const [date, setDate] = useState(previewTimeSheet.date);

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

    if (confirm('Are you sure you want to modify the Time-Sheet?')) {
      const options = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          employee: employeeId,
          project: projectId,
          task: taskId,
          hs_worked: hsWorked,
          timesheetDate: date
        })
      };
      const TimeSheetId = previewTimeSheet._id;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/time-sheet/${TimeSheetId}`,
          options
        );
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
          setChildrenModal(`${res.msg}. The time-sheet can not be created`);
          setShowFormEdit(false);
        } else {
          setShowModal(true);
          setChildrenModal(res.message);
          setShowFormEdit(false);
          editItem(newBody);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit time-sheet</h2>
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
        <Button onClick={() => setShowFormEdit(false)}>Cancel</Button>
      </form>
    </div>
  );
};

export default EditTimeSheet;
