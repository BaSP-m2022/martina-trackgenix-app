import React, { useState, useEffect } from 'react';
import styles from 'Components/Admin/Projects/projects.module.css';
import { Table, Modal, Loader, Button } from 'Components/Shared';
import ProjectForm from 'Components/Admin/Projects/Form/ProjectForm';
import EmployeeAdd from 'Components/Admin/Projects/Form/EmployeeForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, getProjects } from 'redux/projects/thunks';

const Projects = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.projects.isLoading);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousProject, setPreviousProject] = useState({
    id: '',
    project_name: '',
    start_date: '',
    finish_date: '',
    client: '',
    active: '',
    employees: [
      {
        role: '',
        rate: '',
        id: ''
      }
    ]
  });

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const listProjects = useSelector((state) => state.projects.list);

  const sortedProjects = listProjects
    .filter((project) => project.active == true)
    .concat(listProjects.filter((project) => project.active == false));

  const newListProject = sortedProjects.map((item) => {
    return {
      ...item,
      start_date: item.start_date.slice(0, 10),
      finish_date: item.finish_date.slice(0, 10)
    };
  });

  const projectData = newListProject.map((project) => {
    let employeesArray = [];
    project.employees.map((employee) => {
      let first_name = employee.id.first_name;
      let last_name = employee.id.last_name;

      let employeeData = {
        id: employee.id,
        rate: employee.rate,
        role: employee.role,
        _id: employee._id,
        first_name,
        last_name
      };
      employeesArray.push(employeeData);
    });
    return {
      _id: project._id,
      active: project.active,
      start_date: project.start_date.slice(0, 10),
      finish_date: project.finish_date.slice(0, 10),
      project_name: project.project_name,
      client: project.client,
      employees: employeesArray
    };
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      const responseProject = await dispatch(changeStatus(id, false));
      if (!responseProject.error) {
        setTitleModal('Project deleted successfully');
        setShowModal(true);
        dispatch(getProjects());
      }
    }
  };

  const activateProject = async (id) => {
    if (confirm('Are you sure you want to activate this Project?')) {
      const responseProject = await dispatch(changeStatus(id, true));
      if (!responseProject.error) {
        setTitleModal('Project activated successfully');
        setShowModal(true);
        dispatch(getProjects());
      }
    }
  };

  const handleEdit = (project) => {
    setPreviousProject(project);
    setShowForm(true);
  };

  const viewEmployees = (project) => {
    setTitleModal(
      <Table
        title={`${project.project_name}'s employees`}
        data={project.employees}
        headersColumns={['First Name', 'Last Name', 'Role', 'Rate']}
        headers={['first_name', 'last_name', 'role', 'rate']}
      />
    );
    setShowModal(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <Table
            title={'Projects'}
            data={projectData}
            headersColumns={['Project Name', 'Client', 'Start Date', 'Finish Date', '', '']}
            headers={['project_name', 'client', 'start_date', 'finish_date']}
            deleteItem={handleDelete}
            activateItem={activateProject}
            editItem={handleEdit}
            viewMore={viewEmployees}
          />

          <ProjectForm
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            previousProject={previousProject}
            setPreviousProject={setPreviousProject}
          />
          <EmployeeAdd />
          <Button onClick={() => setShowForm(true)}>+ Add Project</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {titleModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default Projects;
