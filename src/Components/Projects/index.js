import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/List';
import Modal from '../Shared/Modal/Modal';
import AddProject from './FormAdd/AddProject';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';

const Projects = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <List
        list={list}
        setList={setList}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        deleteItem={deleteItem}
        editItem={editItem}
        setLoading={setLoading}
      />
      <Button onClick={() => setShowFormAdd(true)}>+ Add Project</Button>
      <AddProject
        showFormAdd={showFormAdd}
        setShowFormAdd={setShowFormAdd}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        addItem={addItem}
        setLoading={setLoading}
      />
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        title={titleModal}
      >
        {titleModal}
      </Modal>
      <Loader show={loading} />
    </section>
  );
};

export default Projects;
