import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/List';
import ProjectForm from './Form/ProjectForm';
import Modal from '../../Shared/Modal/Modal';
import Loader from '../../Shared/Loader/Loader';
import Button from '../../Shared/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/projects/thunks';

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
        rate: '0',
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
