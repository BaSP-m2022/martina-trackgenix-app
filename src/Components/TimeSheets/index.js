import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import AddTimeSheet from './Add/AddTimeSheet';
import Modal from './Modal/Modal';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showFormAdd] = useState(false);

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

  const editTimeSheet = (body) => {
    const updatedTimeSheet = list.map((item) => {
      if (item._id === body._id) {
        return body;
      } else {
        return item;
      }
    });
    setList(updatedTimeSheet);
  };

  const closeForm = () => {
    showFormAdd(false);
  };
  const onClick = () => {
    showFormAdd(true);
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
        editTimeSheet={editTimeSheet}
      />
      <AddTimeSheet
        showFormAdd={showFormAdd}
        setShowModal={setShowModal}
        newTimeSheet={newTimeSheet}
        setTitleModal={setTitleModal}
        closeForm={closeForm}
      />
      <button onClick={onClick} className={styles.addButton}>
        Add
      </button>
      <Modal
        titleModal={titleModal}
        showModal={showModal}
        setShowModal={setShowModal}
        editTimeSheet={editTimeSheet}
      />
    </section>
  );
};

export default TimeSheets;
