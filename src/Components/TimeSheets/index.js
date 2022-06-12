import React, { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import Modal from '../Shared/Modal/Modal';
import FormTimeSheet from './Form/FormTimeSheet';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTimeSheetSuccess,
  getTimeSheetPending,
  getTimeSheetError
} from '../../redux/timeSheets/actions';

const TimeSheets = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.timeSheet.isLoading);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [method, setMethod] = useState('');
  const [previousTimeSheet, setPreviousTimeSheet] = useState({
    _id: '',
    employee: '',
    hs_worked: 0,
    task: '',
    project: '',
    timesheetDate: ''
  });

  const listTS = async () => {
    dispatch(getTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheet`);
      const data = await response.json();
      dispatch(getTimeSheetSuccess(data.data));
    } catch (error) {
      console.error(error);
      dispatch(getTimeSheetError(error));
    }
  };

  useEffect(() => {
    listTS();
  }, []);

  const openForm = () => {
    setMethod('POST');
    setShowForm(true);
  };

  return isLoading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <List
        setShowForm={setShowForm}
        setShowModal={setShowModal}
        setChildrenModal={setChildrenModal}
        setPreviousTimeSheet={setPreviousTimeSheet}
        setMethod={setMethod}
      />
      <FormTimeSheet
        showForm={showForm}
        setShowForm={setShowForm}
        setShowModal={setShowModal}
        setChildrenModal={setChildrenModal}
        previousTimeSheet={previousTimeSheet}
        setPreviousTimeSheet={setPreviousTimeSheet}
        method={method}
      />
      <Button onClick={openForm}>Add a TimeSheets</Button>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        {childrenModal}
      </Modal>
    </section>
  );
};

export default TimeSheets;
