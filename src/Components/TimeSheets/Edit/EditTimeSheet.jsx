import React, { useState, useEffect } from 'react';
import styles from './editTimeSheet.module.css';

const EditTimeSheet = ({
  show,
  closeForm,
  previewTimeSheet,
  setShowModal,
  setTitleModal,
  updatedTimeSheet
}) => {
  if (!show) {
    return null;
  }

  const [listEmployees, setListEmployees] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTasks, setListTasks] = useState([]);
  const [employeeId, setEmployeeId] = useState(previewTimeSheet.employees._id);
  const [projectId, setProjectId] = useState(previewTimeSheet.projects._id);
  const [taskId, setTaskId] = useState(previewTimeSheet.tasks._id);
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
    const TimeSheetId = previewTimeSheet._id;
    const putTS = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      employee: employeeId,
      project: projectId,
      task: taskId,
      hs_worked: hsWorked,
      timesheetDate: date
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/time-sheet/${TimeSheetId}`,
        putTS
      );
      const res = await response.json();
      if (!response.ok) {
        setShowModal(true);
        setTitleModal(`${res.msg}. The time-sheet can not be created`);
      } else {
        console.log(userInput);
        setTitleModal(res.message);
        closeForm(true);
        updatedTimeSheet(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit time-sheet</h2>
        <div>
          <label>Select Employee</label>
          <select name="employee" onChange={(e) => setEmployeeId(e.target.value)}
            {listEmployees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee._id}-{employee.first_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Project</label>
          <select name="project" onChange={(e) => setProjectId(e.target.value)}>
            {listProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project._id}-{project.project_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select name="task" onChange={(e) => setTaskId(e.target.value)}>
            {listTasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task._id}-{task.description}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>HOURS WORKED</label>
          <input
            type="number"
            name="hs_worked"
            value={userInput.hs_worked}
            onChange={(e) => setHSWorked(e.target.value)}
          ></input>
        </div>
        <div>
          <label>DATE</label>
          <input
            type="date"
            name="timesheetDate"
            value={userInput.timesheetDate}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="submit"
            value="Confirm changes"
            onSubmit={() => {
              setShowModal(true);
            }}
          ></input>
        </div>
        <button onClick={closeForm}>x</button>
      </form>
    </div>
  );
};

export default EditTimeSheet;
