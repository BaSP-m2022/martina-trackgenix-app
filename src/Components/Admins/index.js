import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';

const Admins = () => {
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <List list={list} setList={setList} />
    </section>
  );
};

export default Admins;
