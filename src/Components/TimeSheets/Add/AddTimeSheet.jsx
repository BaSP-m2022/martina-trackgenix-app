import React, { useState } from 'react';
import styles from './addTimeSheet.module.css';

const AddTimeSheet = ({ show, closeForm, setShowModal, setShowTitle, newTimeSheet }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    employee: '',
    project: '',
    task: '',
    hs_worked: '',
    timesheetDate: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUserInput({
        employee: '',
        project: '',
        task: '',
        hs_worked: '',
        timesheetDate: ''
    });

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new Time-sheet</h2>
        <div>
          <label>Employee</label>
          <input
            type="text"
            name="employee"
            value={userInput.employee}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Project</label>
          <input
            type="text"
            name="project"
            value={userInput.project}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Task</label>
          <input type="text" name="task" value={userInput.task} onChange={onChange}></input>
        </div>
        <div>
          <label>Hours worked</label>
          <input type="number" name="hs_worked" value={userInput.hs_worked} onChange={onChange}></input>
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="timesheetDate" value={userInput.timesheetDate} onChange={onChange}></input>
        </div>
        <div className={styles.submitButton}>
          <input type="submit" value="Submit"></input>
        </div>
        <button onClick={closeForm}>x</button>
      </form>
    </div>
  );
};

export default AddTimeSheet;