import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Modal from './Modal/Modal';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const listTS = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheet`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listTS();
  }, []);

  const deleteItem = (_id) => {
    setList([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Time-Sheets</h2>
      <List
        list={list}
        setList={setList}
        deleteItem={deleteItem}
        setTitleModal={setTitleModal}
        setShowModal={setShowModal}
      />
      <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default TimeSheets;
