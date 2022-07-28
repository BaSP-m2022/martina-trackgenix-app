import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { Table, Loader, Modal, Button } from 'Components/Shared';
import ProjectForm from 'Components/Employee/Projects/Form/ProjectForm';
import styles from 'Components/Employee/Projects/projects.module.css';
import Tasks from 'Components/Employee/Projects/Tasks';

const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, []);

  const isLoading = useSelector((state) => state.projects.isLoading);
  const user = useSelector((state) => state.auth.user);
  const listProject = useSelector((state) => state.projects.list);

  const [showForm, setShowForm] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
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

  let isPM = false;

  const listProjectEmployee = listProject.filter((project) => {
    if (project.active) {
      return project.employees.find((employee) => employee.id._id == user._id);
    }
  });

  const projectData = listProjectEmployee.map((project) => {
    let role;
    project.employees.map((employee) => {
      if (employee.id._id === user._id) {
        role = employee.role;
        role === 'PM' && (isPM = true);
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
    setPreviousProject(project);
    setShowForm(true);
  };
  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <Table
            title={`${user.first_name} ${user.last_name}'S PROJECTS`}
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
          {isPM && (
            <div className={styles.containerButtons}>
              <Button onClick={() => setShowTaskList(true)}>View Tasks</Button>
            </div>
          )}
          <Tasks
            showTaskList={showTaskList}
            setShowTaskList={setShowTaskList}
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
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
