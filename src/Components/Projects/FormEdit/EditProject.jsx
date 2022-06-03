import React, { useState, useEffect } from 'react';
import styles from './editProject.module.css';

const EditProject = ({
  showFormEdit,
  setShowFormEdit,
  previewProject,
  setShowModal,
  setTitleModal,
  editItem
}) => {
  if (!showFormEdit) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [projectName, setProjectName] = useState(previewProject.project_name);
  const [startDate, setStartDate] = useState(previewProject.start_date);
  const [finishDate, setFinishDate] = useState(previewProject.finish_date);
  const [client, setClient] = useState(previewProject.client);
  const [active, setActive] = useState(previewProject.active);
  // const [employees, setEmployees] = useState({
  //   _id: previewProject.employees[0]._id,
  //   role: previewProject.employees[0].role,
  //   rate: previewProject.employees[0].rate
  // });
  const [employeeId, setEmployeeId] = useState(previewProject.employees[0]._id);
  const [employeeRole, setEmployeeRole] = useState(previewProject.employees[0].role);
  const [employeeRate, setEmployeeRate] = useState(previewProject.employees[0].rate);

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

  // const onChangeEmployee = (e) => {
  //   setEmployees({ ...employees, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    const projectId = previewProject._id;
    const projectEdited = {
      _id: projectId,
      projectName,
      startDate,
      finishDate,
      client,
      active,
      employees: [
        {
          id: employeeId,
          role: employeeRole,
          rate: employeeRate
        }
      ]
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        start_date: startDate,
        finish_date: finishDate,
        client: client,
        active: active,
        employees: [
          {
            id: employeeId,
            role: employeeRole,
            rate: employeeRate
          }
        ]
      })
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        options
      );
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setTitleModal(data.message);
      }
      editItem(projectEdited);
      setTitleModal('Super Admin updated successfully');
      setShowModal(true);
      setShowFormEdit(false);
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
            value={startDate.toString().slice(0, 10)}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Finish Date</label>
          <input
            type="date"
            name="finishDate"
            value={finishDate.toString().slice(0, 10)}
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
          <select name="_id" onChange={(e) => setEmployeeId(e.target.value)}>
            {listEmployees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee._id}-{employee.first_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ROLE Employee</label>
          <select
            name="role"
            value={employeeRole}
            onChange={(e) => setEmployeeRole(e.target.value)}
          >
            <option value="DEV">DEV</option>
            <option value="PM">PM</option>
            <option value="QA">QA</option>
            <option value="TL">TL</option>
          </select>
        </div>
        <div>
          <label>RATE Employee</label>
          <input
            type="text"
            name="rate"
            value={employeeRate}
            onChange={(e) => setEmployeeRate(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <select name="active" value={active} onChange={(e) => setActive(e.target.value)}>
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Confirm" onSubmit={onSubmit}></input>
        </div>
        <div>
          <button onClick={() => setShowFormEdit(false)}>Close</button>
        </div>
      </form>
    </div>
  );
};
export default EditProject;
