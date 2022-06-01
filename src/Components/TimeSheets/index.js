import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Modal from '../Modal/Modal';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        setList(response.data);
      });
  }, []);

  const deleteItem = (_id) => {
    setList([...list.filter((list) => list._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Time-Sheets</h2>
      {showModal && (
        <Modal title={'Delete successfully'} show={showModal} setShowModal={setShowModal} />
      )}
      <List list={list} setList={setList} deleteItem={deleteItem} setShowModal={setShowModal} />
    </section>
  );
};

// useEffect(async () => {
//    try {
//      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
//      const data = await response.json();
//      setList(data.data);
//    } catch (error) {
//      console.error(error);
//    }
//  }, []);

//  return (
//    <section className={styles.container}>
//      <h2>Time-Sheets</h2>
//      <List list={list} setList={setList} />
//    </section>
//  );
//};

export default TimeSheets;
