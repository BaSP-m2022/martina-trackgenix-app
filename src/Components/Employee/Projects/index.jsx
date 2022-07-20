import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { Table, Loader, Modal } from 'Components/Shared';
import ProjectForm from 'Components/Employee/Projects/Form/ProjectForm';
import styles from 'Components/Employee/Projects/projects.module.css';

const Projects = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [previousProject, setPreviousProject] = useState({
    _id: '',
    project_name: '',
    start_date: '',
    finish_date: '',
    client: '',
    active: '',
    employees: [
      {
        id: '',
        role: '',
        rate: 0
      }
    ]
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, []);

  const isLoading = useSelector((state) => state.projects.isLoading);
  const user = useSelector((state) => state.auth.user);
  const listProject = useSelector((state) => state.projects.list);

  const listProjectEmployee = listProject.filter((project) => {
    if (project.active) {
      return project.employees.find((employee) => employee.id._id == user._id);
    }
  });

  const projectData = listProjectEmployee.map((project) => {
    let role;
    project.employees.map((employee) => {
      if (employee.id._id == user._id) {
        role = employee.role;
      }
    });

    return {
      _id: project._id,
      active: project.active,
      start_date: project.start_date.slice(0, 10),
      finish_date: project.finish_date.slice(0, 10),
      project_name: project.project_name,
      client: project.client,
      employees: project.employees,
      role
    };
  });

  const viewMore = (project) => {
    // console.log('project en handleEdit: ', project);
    if (project.role == 'PM') {
      setPreviousProject(project);
      setShowForm(true);
    } else {
      setShowModal(true);
      setTitleModal('aqui veras tu timsheet cuando lucho termine');
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <Table
            title={`Welcome ${user.first_name} ${user.last_name}`}
            data={projectData}
            headersColumns={['Project Name', 'Client', 'Role', 'Start Date', 'Finish Date']}
            headers={['project_name', 'client', 'role', 'start_date', 'finish_date']}
            viewMore={viewMore}
          />
          <ProjectForm
            showForm={showForm}
            setShowForm={setShowForm}
            previousProject={previousProject}
            setPreviousProject={setPreviousProject}
            setTitleModal={setTitleModal}
            setShowModal={setShowModal}
          />
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {titleModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Projects;
