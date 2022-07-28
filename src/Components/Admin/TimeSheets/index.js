import React, { useState, useEffect } from 'react';
import styles from 'Components/Admin/TimeSheets/time-sheets.module.css';
import List from 'Components/Admin/TimeSheets/List/List.jsx';
import { Loader, Button, Modal } from 'Components/Shared';
import FormTimeSheet from 'Components/Admin/TimeSheets/Form/FormTimeSheet';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from 'redux/timeSheets/thunks';

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

  useEffect(() => {
    dispatch(getTimeSheet());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <h2>Time-Sheets</h2>
          <List
            setPreviousTimeSheet={setPreviousTimeSheet}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
          />
          <FormTimeSheet
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previousTimeSheet={previousTimeSheet}
            setPreviousTimeSheet={setPreviousTimeSheet}
          />
          <Button onClick={() => setShowForm(true)}>Add TimeSheet</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default TimeSheets;
