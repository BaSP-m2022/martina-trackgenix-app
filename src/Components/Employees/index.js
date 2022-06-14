import React, { useState, useEffect } from 'react';
import styles from './employees.module.css';
import List from './List/List';
import EmployeeForm from './Form/EmployeeForm';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import { cleanEmployeesError } from '../../redux/employees/actions';

const Employees = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    state.employees.isLoading;
  });

  //const [list, setList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
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
  //const [method, setMethod] = useState('');

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  // POST EMPLOYEE
  // const addItem = ({ _id, first_name, last_name, phone, email, password, active }) => {
  //   const newItem = {
  //     _id,
  //     first_name,
  //     last_name,
  //     phone,
  //     email,
  //     password,
  //     active
  //   };
  //   setList([...list, newItem]);
  // };

  // PUT EMPLOYEE
  // const editItem = (data) => {
  //   const empnUpd = list.map((employee) => {
  //     if (employee._id === data._id) {
  //       return data;
  //     } else {
  //       return employee;
  //     }
  //   });
  //   setList(empnUpd);
  // };

  const openForm = () => {
    //setMethod('POST');
    setShowForm(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <h2>Employees</h2>
          <EmployeeForm
            //addItem={addItem}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            //setIsLoading={setIsLoading}
            //editItem={editItem}
            previewEmployee={previewEmployee}
            setPreviewsEmployee={setPreviewEmployee}
            //method={method}
          />
          <List
            //deleteItem={deleteItem}
            //list={list}
            setPreviewsEmployee={setPreviewEmployee}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            //setIsLoading={setIsLoading}
            //setMethod={setMethod}
          />
          <Button onClick={openForm}>Add New Employee</Button>
          <Modal
            isOpen={showModal}
            handleClose={(() => setShowModal(false), dispatch(cleanEmployeesError()))}
          >
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Employees;
