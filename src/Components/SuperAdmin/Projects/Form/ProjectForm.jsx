import React, { useState, useEffect } from 'react';
import styles from './projectForm.module.css';
import Input from '../../../Shared/Field/Input';
import Button from '../../../Shared/Buttons/Buttons';
import Dropdown from '../Dropdown/index';
import { useDispatch } from 'react-redux';
import { addProject, editProject } from '../../../../redux/projects/thunks';

const ProjectForm = ({
  showForm,
  setShowForm,
  previousProject,
  setPreviousProject,
  setShowModal,
  setTitleModal
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

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    const newProjects = {
      _id: previousProject._id,
      project_name: projectName,
      client: client,
      start_date: startDate,
      finish_date: finishDate,
      active: active,
      employees: [
        {
          id: employeeId,
          role: employeeRole,
          rate: employeeRate
        }
      ]
    };
    if (!previousProject._id) {
      try {
        const project = await dispatch(addProject(newProjects));
        if (project.error) {
          setTitleModal(project.message);
          setShowModal(true);
        } else {
          setTitleModal(project.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const project = await dispatch(editProject(newProjects));
        if (project.error) {
          setTitleModal(project.message);
          setShowModal(true);
        } else {
          setTitleModal(project.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
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
