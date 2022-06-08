import React, { useState, useEffect } from 'react';
import styles from './addProject.module.css';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';
import Button from '../../Shared/Buttons/Buttons';

const AddProject = ({ showFormAdd, setShowFormAdd, setShowModal, setTitleModal, addItem }) => {
  if (!showFormAdd) {
    return null;
  }
  const [listEmployees, setListEmployees] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState(false);
  const [employees, setEmployees] = useState({
    id: '',
    role: '',
    rate: ''
  });

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
        setShowFormAdd(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form id="addForm" onSubmit={onSubmit}>
        <h2>Add Project</h2>
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
        <Button onClick={() => setShowFormAdd(false)}>Close</Button>
      </form>
    </div>
  );
};

export default AddProject;
