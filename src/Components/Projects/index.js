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

  const deleteItem = (id) => {
    setList([...list.filter((listItem) => listItem._id !== id)]);
  };

  const addItem = (body) => {
    const newItem = {
      _id: body._id,
      project_name: body.project_name,
      start_date: body.start_date,
      finish_date: body.finish_date,
      client: body.client,
      active: body.active,
      employees: [
        {
          id: body.employees[0].id,
          role: body.employees[0].role,
          rate: parseInt(body.employees[0].rate)
        }
      ]
    };
    setList([...list, newItem]);
  };

  const editItem = (data) => {
    setList(list.map((e) => (e._id === data._id ? data : e)));
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
