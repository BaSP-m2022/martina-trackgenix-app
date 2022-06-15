import React, { useState, useEffect } from 'react';
import styles from './projectForm.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';
import Dropdown from '../Dropdown/index';

const ProjectForm = ({
  showForm,
  setShowForm,
  previousProject,
  setPreviousProject,
  setShowModal,
  setTitleModal,
  addItem,
  editItem,
  setLoading,
  method
}) => {
  if (!showForm) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [projectName, setProjectName] = useState(previousProject?.project_name || '');
  const [startDate, setStartDate] = useState(previousProject?.start_date);
  const [finishDate, setFinishDate] = useState(previousProject?.start_date);
  const [client, setClient] = useState(previousProject?.client || '');
  const [active, setActive] = useState(!!previousProject?.active);
  const [employeeId, setEmployeeId] = useState(previousProject?.employees[0]?.id || '');
  const [employeeRate, setEmployeeRate] = useState(
    parseInt(previousProject?.employees[0]?.rate) || ''
  );
  const [employeeRole, setEmployeeRole] = useState(previousProject?.employees[0]?.role || '');

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployees([...listEmployees, ...data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const cleanFields = () => {
    setPreviousProject({
      _id: '',
      project_name: '',
      client: '',
      start_date: '',
      finish_date: '',
      active: '',
      employees: {
        id: '',
        role: '',
        rate: 0
      }
    });
  };

  const fetchProjects = async (url, methodFunction) => {
    const options = {
      method: method,
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
            rate: `${employeeRate}`
          }
        ]
      })
    };
    try {
      const response = await fetch(url, options);
      const res = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        setShowForm(false);
        setShowModal(true);
        setTitleModal('The projects cannot be created');
      } else {
        setShowForm(false);
        setShowModal(true);
        setTitleModal('Projects was added');
        methodFunction(res.data);
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

    if (!previousProject._id) {
      const url = `${process.env.REACT_APP_API_URL}/projects`;
      fetchProjects(url, addItem);
    } else {
      const url = `${process.env.REACT_APP_API_URL}/projects/${previousProject._id}`;
      fetchProjects(url, editItem);
    }
  };

  const closeForm = () => {
    cleanFields();
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Project Form</h2>
        <Input
          type={'text'}
          name={'projectName'}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          label={'Project Name'}
        ></Input>
        <Input
          type={'date'}
          name={'startDate'}
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
          label={'Start Date'}
        ></Input>
        <Input
          type={'date'}
          name={'finishDate'}
          value={finishDate}
          onChange={(e) => {
            setFinishDate(e.target.value);
          }}
          label={'Finish Date'}
        ></Input>
        <Input
          type={'text'}
          name={'client'}
          value={client}
          onChange={(e) => setClient(e.target.value)}
          label={'Client'}
        ></Input>
        <Input
          type={'select'}
          name={'id'}
          valueOptions={listEmployees}
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          label="Select Employee"
        ></Input>
        <Dropdown
          title="role"
          value={employeeRole}
          onChange={(e) => setEmployeeRole(e.target.value)}
        >
          <option value="selectRole">Select a role</option>
          <option value="DEV">DEV</option>
          <option value="QA">QA</option>
          <option value="TL">TL</option>
          <option value="PM">PM</option>
        </Dropdown>
        <Input
          type={'number'}
          name={'rate'}
          value={employeeRate}
          onChange={(e) => setEmployeeRate(e.target.value)}
          label="RATE Employee"
        ></Input>
        <label htmlFor="active">Active</label>
        <input
          type={'checkbox'}
          name={'Active'}
          onChange={() => setActive(!active)}
          label={'Active'}
          checked={active}
        ></input>
        <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        <Button onClick={closeForm}>Close</Button>
      </form>
    </div>
  );
};

export default ProjectForm;
