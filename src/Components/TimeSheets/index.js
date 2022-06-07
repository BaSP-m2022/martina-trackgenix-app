import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import AddTimeSheet from './Add/AddTimeSheet';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import Modal from '../Shared/Modal/Modal';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  const listTS = async () => {
    try {
      const response = await fetch('http://localhost:4000/time-sheet');
      const data = await response.json();
      setList(data.data);
      setLoading(false);
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

  const handleClose = () => {
    setShowModal(false);
  };

  const closeForm = () => {
    setShowFormAdd(false);
  };

  const onClick = () => {
    setShowFormAdd(true);
  };

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <h2>Time-Sheets</h2>
      <List
        list={list}
        setList={setList}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        editTimeSheet={editTimeSheet}
        setLoading={setLoading}
        setTitleModal={setTitleModal}
      />
      <AddTimeSheet
        show={showFormAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        newTimeSheet={newTimeSheet}
        closeForm={closeForm}
        setLoading={setLoading}
        setTitleModal={setTitleModal}
      />
      <Button onClick={onClick}>Add a TimeSheets</Button>
      <Modal handleClose={handleClose} isOpen={showModal} title={titleModal}>
        {titleModal}
      </Modal>
    </section>
  );
};

export default TimeSheets;
