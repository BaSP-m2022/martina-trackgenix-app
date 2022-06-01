import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Modal from '../Modal/Modal';
import AddTimeSheet from './Add/AddTimeSheet';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState();
  const [showFormAdd] = useState(false);

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

  const newTimeSheet = (body) => {
    const NewTimeSheet = {
      _id: body._id,
      employee: body.employee,
      project: body.project,
      task: body.task,
      hs_worked: body.hs_worked,
      timesheetDate: body.timesheetDate
    };
    setList([...list, NewTimeSheet]);
  };

  return (
    <section className={styles.container}>
      <h2>Time-Sheets</h2>
      {showModal && (
        <Modal title={'Delete successfully'} show={showModal} setShowModal={setShowModal} />
      )}
      <AddTimeSheet show={showFormAdd} setShowModal={setShowModal} newTimeSheet={newTimeSheet} />
      <List list={list} setList={setList} deleteItem={deleteItem} setShowModal={setShowModal} />
    </section>
  );
};

export default TimeSheets;
