import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import Modal from '../Shared/Modal/Modal';
import FormTimeSheet from './Form/FormTimeSheet';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteTimeSheetSuccess } from '../../redux/timeSheets/actions';
import { getTimeSheet } from '../../redux/timeSheets/thunks';

const TimeSheets = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.timeSheet.isLoading);

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousTimeSheet, setPreviousTimeSheet] = useState({
    _id: '',
    employee: '',
    hs_worked: 0,
    task: '',
    project: '',
    timesheetDate: ''
  });
  const [method, setMethod] = useState('');

  useEffect(() => {
    dispatch(getTimeSheet());
  }, []);

  // const deleteItem = (_id) => {
  //   dispatch(deleteTimeSheetSuccess(_id));
  // };

  // const newItem = (body) => {
  //   const newTimeSheet = {
  //     _id: body._id,
  //     employee: body.employee,
  //     project: body.project,
  //     task: body.task,
  //     hs_worked: body.hs_worked,
  //     timesheetDate: body.timesheetDate
  //   };
  //   setList([...list, newTimeSheet]);
  // };

  // const editItem = (body) => {
  //   const updatedTimeSheet = list.map((item) => {
  //     if (item._id === body._id) {
  //       return body;
  //     } else {
  //       return item;
  //     }
  //   });
  //   setList(updatedTimeSheet);
  // };

  const openForm = () => {
    setMethod('POST');
    setShowForm(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <List
            // list={listTimeSheet}
            // deleteItem={deleteItem}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            setPreviousTimeSheet={setPreviousTimeSheet}
            setShowForm={setShowForm}
            setMethod={setMethod}
          />
          <FormTimeSheet
            // addItem={newItem}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            // editItem={editItem}
            previousTimeSheet={previousTimeSheet}
            setPreviousTimeSheet={setPreviousTimeSheet}
            method={method}
          />
          <Button onClick={openForm}>Add a TimeSheets</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default TimeSheets;
