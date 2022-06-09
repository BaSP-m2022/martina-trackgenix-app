import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import AddTimeSheet from './Add/AddTimeSheet';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import Modal from '../Shared/Modal/Modal';
import EditTimeSheet from './Edit/EditTimeSheet';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [previewTimeSheet, setPreviewTimeSheet] = useState({
    _id: '',
    employee: '',
    hs_worked: '',
    task: '',
    project: '',
    timesheetDate: ''
  });

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

  const newItem = (body) => {
    console.log(body);
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

  const editItem = (body) => {
    const updatedTimeSheet = list.map((item) => {
      if (item._id === body._id) {
        return body;
      } else {
        return item;
      }
    });
    setList(updatedTimeSheet);
  };

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <h2>Time-Sheets</h2>
      <List
        list={list}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowFormEdit={setShowFormEdit}
        setLoading={setLoading}
        setChildrenModal={setChildrenModal}
        setPreviewTimeSheet={setPreviewTimeSheet}
      />
      <AddTimeSheet
        showFormAdd={showFormAdd}
        setShowFormAdd={setShowFormAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        newItem={newItem}
        setLoading={setLoading}
        setChildrenModal={setChildrenModal}
      />
      <EditTimeSheet
        editItem={editItem}
        showFormEdit={showFormEdit}
        setShowFormEdit={setShowFormEdit}
        setShowModal={setShowModal}
        setChildrenModal={setChildrenModal}
        previewTimeSheet={previewTimeSheet}
        setPreviewTimeSheet={setPreviewTimeSheet}
      />
      <Button onClick={() => setShowFormAdd(true)}>Add a TimeSheets</Button>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        {childrenModal}
      </Modal>
    </section>
  );
};

export default TimeSheets;
