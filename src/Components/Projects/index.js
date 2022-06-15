import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/List';
import ProjectForm from './Form/ProjectForm';
import Modal from '../Shared/Modal/Modal';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/projects/thunks';

const Projects = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.projects.isLoading);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [method, setMethod] = useState('');
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

  const onClick = () => {
    setShowForm(true);
    setMethod('POST');
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <List
            setShowForm={setShowForm}
            setPreviousProject={setPreviousProject}
            setMethod={setMethod}
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
            method={method}
          />
          <Button onClick={onClick}>+ Add Project</Button>
          <Modal isOpen={showModal} handleClose={handleClose} title={titleModal}>
            {titleModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default Projects;
