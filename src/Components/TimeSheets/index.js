import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import Modal from '../Shared/Modal/Modal';
import FormTimeSheet from './Form/FormTimeSheet';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from '../../redux/timeSheets/thunks';
import { cleanTimeSheetError } from '../../redux/timeSheets/actions';

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

  const handleClose = () => {
    setShowModal(false);
    dispatch(cleanTimeSheetError());
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <List setPreviousTimeSheet={setPreviousTimeSheet} setShowForm={setShowForm} />
          <FormTimeSheet
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previousTimeSheet={previousTimeSheet}
            setPreviousTimeSheet={setPreviousTimeSheet}
          />
          <Button onClick={() => setShowForm(true)}>Add a TimeSheets</Button>
          <Modal isOpen={showModal} handleClose={handleClose}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default TimeSheets;
