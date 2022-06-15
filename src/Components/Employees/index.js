import React, { useState, useEffect } from 'react';
import styles from './employees.module.css';
import List from './List/List';
import EmployeeForm from './Form/EmployeeForm';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';

const Employees = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [previewEmployee, setPreviewEmployee] = useState({
    _id: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    active: ''
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <h2>Employees</h2>
          <EmployeeForm
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previewEmployee={previewEmployee}
            setPreviewsEmployee={setPreviewEmployee}
          />
          <List setPreviewsEmployee={setPreviewEmployee} setShowForm={setShowForm} />
          <Button onClick={() => setShowForm(true)}>Add New Employee</Button>
          <Modal isOpen={showModal} handleClose={handleClose}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Employees;
