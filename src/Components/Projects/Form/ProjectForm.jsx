import React, { useState, useEffect } from 'react';
import styles from './projectForm.module.css';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
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
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState('');
  // const [employees, setEmployees] = useState(previousProject.employees);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeRate, setEmployeeRate] = useState();
  const [employeeRole, setEmployeeRole] = useState('');
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployees([...listEmployees, ...data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  console.log({ listEmployees });
  useEffect(() => {
    fetchEmployees();
  }, []);

  // const onChangeEmployee = (e) => {
  //   setEmployees({ ...employees, [e.target.name]: e.target.value });
  // };

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
            rate: employeeRate
          }
        ]
      })
    };
    console.log({ options });
    try {
      const response = await fetch(url, options);
      const res = await response.json();
      const newBody = {
        _id: res.data._id,
        project_name: res.data.project_name,
        client: res.data.client,
        start_date: res.data.start_date,
        finish_date: res.data.finish_date,
        active: res.data.active,
        employees: [
          {
            _id: res.data.employees,
            role: employeeRole,
            rate: employeeRate
          }
        ]
      };
      console.log({ response });
      if (response.status !== 201 && response.status !== 200) {
        setShowForm(false);
        setShowModal(true);
        setTitleModal('The projects cannot be created');
      } else {
        setShowForm(false);
        setShowModal(true);
        setTitleModal('Projects was added');
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

    if (!previousProject._id) {
      const url = `http://localhost:4000/projects`;
      fetchProjects(url, addItem);
    } else {
      const url = `${process.env.LOCAL_APP_API_URL}/projects/${previousProject._id}`;
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
          onChange={(e) => setStartDate(e.target.value)}
          label={'Start Date'}
        ></Input>
        <Input
          type={'date'}
          name={'finishDate'}
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
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
          onChange={(e) => {
            console.log('target:', e.target);
            setEmployeeId(e.target.value);
          }}
          label="Select Employee"
        ></Input>
        <Dropdown
          title="role"
          value={employeeRole}
          onChange={(e) => setEmployeeRole(e.target.value)}
        >
          <option value="DEV">DEV</option>
          <option value="QA">QA</option>
          <option value="TL">TL</option>
          <option value="PM">PM</option>
        </Dropdown>
        <Input
          type={'number'}
          name={'rate'}
          onChange={(e) => setEmployeeRate(e.target.value)}
          label="RATE Employee"
        ></Input>
        <RadioButton
          name={'Active'}
          onChange={(e) => setActive(e.target.value)}
          label={'Active'}
          value={[true, false]}
        ></RadioButton>
        <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        <Button onClick={closeForm}>Close</Button>
      </form>
    </div>
  );
};

export default ProjectForm;
