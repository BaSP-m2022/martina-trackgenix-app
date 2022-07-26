import React, { useState, useEffect } from 'react';
import styles from 'Components/Admin/Projects/projects.module.css';
import List from 'Components/Admin/Projects/List/List';
import ProjectForm from 'Components/Admin/Projects/Form/ProjectForm';
import EmployeeAdd from 'Components/Admin/Projects/Form/EmployeeForm';
import Modal from 'Components/Shared/Modal/Modal';
import Loader from 'Components/Shared/Loader/Loader';
import Button from 'Components/Shared/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';

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

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <List
            setShowForm={setShowForm}
            setPreviousProject={setPreviousProject}
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
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
    </>
  );
};

export default Projects;
