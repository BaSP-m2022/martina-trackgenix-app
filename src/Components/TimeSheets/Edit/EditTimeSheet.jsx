import React, { useState } from 'react';
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

  const [userInput, setUserInput] = useState({
    _id: previewTimeSheet._id,
    employee: previewTimeSheet.employee.first_name,
    project: previewTimeSheet.project.project_name,
    task: previewTimeSheet.task.description,
    hs_worked: previewTimeSheet.hs_worked,
    timesheetDate: previewTimeSheet.timesheetDate
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const TimeSheetId = previewTimeSheet._id;
    const putTS = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      employee: userInput.employee.first_name,
      project: userInput.project.project_name,
      task: userInput.task.description,
      hs_worked: userInput.hs_worked,
      timesheetDate: userInput.timesheetDate
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
          <label>Employee</label>
          <input type="text" name="employee" value={userInput.employee} onChange={onChange}></input>
        </div>
        <div>
          <label>Project</label>
          <input type="text" name="project" value={userInput.project} onChange={onChange}></input>
        </div>
        <div>
          <label>Task</label>
          <input type="text" name="task" value={userInput.task} onChange={onChange}></input>
        </div>
        <div>
          <label>HOURS WORKED</label>
          <input
            type="number"
            name="hs_worked"
            value={userInput.hs_worked}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>DATE</label>
          <input
            type="date"
            name="timesheetDate"
            value={userInput.timesheetDate}
            onChange={onChange}
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
