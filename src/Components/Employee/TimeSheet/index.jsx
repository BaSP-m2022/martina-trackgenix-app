import React, { useEffect, useState } from 'react';
import styles from 'Components/Employee/TimeSheet/timesheets.module.css';
// import Table from 'Components/Shared/Table/Table';
import TimeSheetHs from './Table/Table';
import { Modal, Button, Loader } from 'Components/Shared/';
import Form from 'Components/Employee/TimeSheet/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from 'redux/timeSheets/thunks';
import moment from 'moment';
import { getProjects } from 'redux/projects/thunks';

const TimeSheet = () => {
  const isLoading = useSelector((state) => state.timeSheet.isLoading);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousTimeSheet, setPreviousTimeSheet] = useState({
    _id: '',
    employee: user?._id,
    hs_worked: 0,
    task: '',
    project: '',
    timesheetDate: ''
  });

  useEffect(() => {
    dispatch(getTimeSheet());
    dispatch(getProjects());
  }, []);

  const listTimeSheet = useSelector((state) => state.timeSheet.list);

  const filteredListTimeSheet = listTimeSheet.filter(
    (timeSheet) => timeSheet.employee?._id == user?._id
  );

  // const newList = filteredListTimeSheet.map((item) => {
  //   return {
  //     _id: item._id,
  //     employee: item.employee ? item.employee.first_name : '',
  //     hs_worked: item.hs_worked,
  //     task: item.task ? item.task.description : '',
  //     project: item.project ? item.project.project_name : '',
  //     timesheetDate: moment(item.timesheetDate).format('DD-MM-YYYY'),
  //     timesheetDay: moment(item.timesheetDate).format('dddd')
  //   };
  // });
  const newList = filteredListTimeSheet.map((item) => {
    return {
      hs_worked: item.hs_worked,
      timesheetDate: item.timesheetDate,
      timesheetDay: moment(item.timesheetDate).format('dddd'),
      project: item.project.project_name
    };
  });

  const deleteItem = () => {
    setShowModal(true);
    setChildrenModal('You cannot delete a time-sheet');
  };

  const handleEdit = (timeSheet) => {
    setPreviousTimeSheet({
      _id: timeSheet._id,
      employee: user?._id,
      hs_worked: timeSheet.hs_worked,
      task: timeSheet.task,
      project: timeSheet.project,
      timesheetDate: timeSheet.timesheetDate
    });
    setShowForm(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <TimeSheetHs
            title={`${user?.first_name}'s Time-Sheet`}
            data={newList}
            deleteItem={deleteItem}
            editItem={handleEdit}
            setChildrenModal={setChildrenModal}
            setShowModal={setShowModal}
            showModal={showModal}
            childrenModal={childrenModal}
            setShowForm={setShowForm}
          />
          <Form
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previousTimeSheet={previousTimeSheet}
            setPreviousTimeSheet={setPreviousTimeSheet}
          />
          <Button onClick={() => setShowForm(true)}>Add a TimeSheets</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default TimeSheet;
