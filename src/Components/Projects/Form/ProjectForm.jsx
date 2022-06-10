import React, { useState, useEffect } from 'react';
import styles from './addProject.module.css';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import Button from '../../Shared/Buttons/Buttons';

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
  const [projectName, setProjectName] = useState(previousProject.project_name);
  const [startDate, setStartDate] = useState(previousProject.start_date);
  const [finishDate, setFinishDate] = useState(previousProject.finish_date);
  const [client, setClient] = useState(previousProject.client);
  const [active, setActive] = useState(previousProject.active);
  const [employees, setEmployees] = useState({
    _id: '',
    role: '',
    rate: ''
  });

  const cleanFields = () => {
    setPreviousProject({
      _id: '',
      project_name: '',
      client: '',
      start_date: '',
      finish_date: '',
      active: ''
    });
  };

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

  const onChangeEmployee = (e) => {
    setEmployees({ ...employees, [e.target.name]: e.target.value });
  };

  const fetchProjects = async (url, methodFunction) => {
    const options = {
      method: method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        client: client,
        start_date: startDate,
        finish_date: finishDate,
        active: active
      })
    };

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        setShowForm(false);
        setShowModal(true);
        setTitleModal(res.message);
      } else {
        setShowForm(false);
        setShowModal(true);
        setTitleModal(res.message);
        methodFunction(res.data);
        cleanFields();
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
          onChange={onChangeEmployee}
          label="Select Employee"
        ></Input>
        <Input
          type={'select'}
          name={'role'}
          onChange={onChangeEmployee}
          label={'Role Employee'}
          valueOptions={['QA', 'PM', 'DEV', 'TL']}
        ></Input>
        <Input
          type={'number'}
          name={'rate'}
          value={employees.rate}
          onChange={onChangeEmployee}
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
      </form >
    </div >
  );
};

export default ProjectForm;
