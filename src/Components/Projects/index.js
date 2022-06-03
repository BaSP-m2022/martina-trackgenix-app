import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/List';
import Modal from './Modal/Modal';
import AddProject from './FormAdd/AddProject';

const Projects = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showFormAdd, setShowFormAdd] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setList(data.data);
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

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <List
        list={list}
        setList={setList}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        deleteItem={deleteItem}
        editItem={editItem}
      />
      <button onClick={() => setShowFormAdd(true)}>+ Add Project</button>
      <AddProject
        showFormAdd={showFormAdd}
        setShowFormAdd={setShowFormAdd}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        addItem={addItem}
      />
      <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Projects;
