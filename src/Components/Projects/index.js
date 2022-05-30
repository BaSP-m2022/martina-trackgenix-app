import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/List';

const Projects = () => {
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <List list={list} setList={setList} />
    </section>
  );
};

export default Projects;
