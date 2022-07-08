import React, { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import Loader from 'Components/Shared/Loader/Loader';
import Modal from 'Components/Shared/Modal/Modal';
import ProjectForm from 'Components/Employee/Projects/Form/ProjectForm';

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
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
        rate: '0',
        id: ''
      }
    ]
  });

  const isLoading = useSelector((state) => state.projects.isLoading);
  const user = useSelector((state) => state.auth.user);
  const listProject = useSelector((state) => state.projects.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  console.log('user: ', user);
  console.log('listProject: ', listProject);

  const listProjectEmployee = listProject.filter((project) => {
    return project.employees.find((employee) => employee.id == user._id);
  });

  console.log('listProjectEmployee: ', listProjectEmployee);

  const projectData = listProjectEmployee.map((project) => {
    let role;
    project.employees.map((employee) => {
      if (employee.id == user._id) {
        role = employee.role;
      }
    });

    console.log('role: ', role);

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

  console.log('projectData: ', projectData);

  const handleEdit = (project) => {
    console.log('project en handleEdit: ', project);
    if (project.role == 'PM') {
      setPreviousProject(project);
      setShowModal(true);
      setChildrenModal('You edit project');
      setShowForm(true);
    } else {
      setShowModal(true);
      setChildrenModal('You cannot edit project');
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section>
          <Table
            title={'My projects'}
            data={projectData}
            headersColumns={['Project Name', 'Client', 'Role', 'Start Date', 'Finish Date']}
            headers={['project_name', 'client', 'role', 'start_date', 'finish_date']}
            editItem={handleEdit}
          />
          <ProjectForm
            showForm={showForm}
            setShowForm={setShowForm}
            previousProject={previousProject}
            setPreviousProject={setPreviousProject}
            setTitleModal={childrenModal}
            setShowModal={setShowModal}
          />
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default Projects;
