import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/List';
import ProjectForm from './Form/ProjectForm';
import Modal from '../Shared/Modal/Modal';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';

const Projects = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState('');
  const [previousProject, setPreviousProject] = useState({
    _id: '',
    project_name: '',
    client: '',
    start_date: '',
    finish_date: '',
    active: ''
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setList(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = (_id) => {
    setList([...list.filter((listItem) => listItem._id !== _id)]);
  };

  const addItem = ({ _id, project_name, start_date, finish_date, client, active }) => {
    const newItem = {
      _id,
      project_name,
      start_date,
      finish_date,
      client,
      active
    };
    setList([...list, newItem]);
  };

  const editItem = (data) => {
    const projectsUpdated = list.map((project) => {
      if (project._id === data._id) {
        return data;
      } else {
        return project;
      }
    });
    setList(projectsUpdated);
  };

  const onClick = () => {
    setShowForm(true);
    setMethod('POST');
  };

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <List
        list={list}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        deleteItem={deleteItem}
        setShowForm={setShowForm}
        setPreviousProject={setPreviousProject}
        setLoading={setLoading}
        setMethod={setMethod}
      />
      <ProjectForm
        showForm={showForm}
        setShowForm={setShowForm}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        previousProject={previousProject}
        setPreviousProject={setPreviousProject}
        addItem={addItem}
        editItem={editItem}
        setLoading={setLoading}
        method={method}
      />
      <Button onClick={onClick}>+ Add Project</Button>
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        title={titleModal}
      >
        {titleModal}
      </Modal>
    </section>
  );
};

export default Projects;
