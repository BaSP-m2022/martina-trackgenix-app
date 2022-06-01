import React, { useState, useEffect } from 'react';
import styles from './addProject.module.css';

const AddProject = ({ showFormAdd, setShowFormAdd, setShowModal, setTitleModal, addItem }) => {
  if (!showFormAdd) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState('');
  const [employees, setEmployees] = useState({
    id: '',
    role: '',
    rate: ''
  });

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployees(...listEmployees, data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChangeEmployee = (e) => {
    setEmployees({ ...employees, [e.target.name]: e.target.value });
    console.log(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        start_date: startDate,
        finish_date: finishDate,
        client: client,
        active: active,
        employees: [employees]
      })
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, options);
      const res = await response.json();
      if (response.status !== 201) {
        setShowModal(true);
        setTitleModal(res.error);
      } else {
        setShowModal(true);
        setTitleModal(res.message);
        addItem(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form id="addForm" onSubmit={onSubmit}>
        <h2>Add Project</h2>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Finish Date</label>
          <input
            type="date"
            name="finishDate"
            value={finishDate}
            onChange={(e) => setFinishDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Client</label>
          <input
            type="text"
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Select Employee</label>
          <select name="id" onChange={onChangeEmployee}>
            {listEmployees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee._id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ROLE Employee</label>
          <input list="role" name="role" value={employees.role} onChange={onChangeEmployee}></input>
          <datalist id="role">
            <option value="DEV"></option>
            <option value="PM"></option>
            <option value="QA"></option>
            <option value="TL"></option>
          </datalist>
        </div>
        <div>
          <label>RATE Employee</label>
          <input type="text" name="rate" value={employees.rate} onChange={onChangeEmployee}></input>
        </div>
        <div>
          <label>Active</label>
          <input
            list="data"
            name="active"
            value={active}
            onChange={(e) => setActive(e.target.value)}
          ></input>
          <datalist id="data">
            <option value="true"></option>
            <option value="false"></option>
          </datalist>
        </div>
        <div>
          <input type="submit" value="Confirm" onSubmit={onSubmit}></input>
        </div>
        <div>
          <button onClick={() => setShowFormAdd(false)}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
