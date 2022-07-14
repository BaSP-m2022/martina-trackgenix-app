import React, { useState, useEffect } from 'react';
import styles from 'Components/Admin/Employees/employees.module.css';
import EmployeeForm from 'Components/Admin/Employees/Form/EmployeeForm';
import Modal from 'Components/Shared/Modal/Modal';
import Button from 'Components/Shared/Buttons/Buttons';
import Loader from 'Components/Shared/Loader/Loader';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';

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

  const listEmployees = useSelector((state) => state.employees.list);
  const listActiveEmployees = listEmployees.filter((employee) => employee.active == true);
  const listInactiveEmployees = listEmployees.filter((employee) => employee.active == false);
  const employeesSorted = listActiveEmployees.concat(listInactiveEmployees);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <EmployeeForm
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previewEmployee={previewEmployee}
            setPreviewsEmployee={setPreviewEmployee}
          />
          <Table
            title={'Employees'}
            data={employeesSorted}
            headersColumns={['Fist Name', 'Last Name', 'Phone', 'Email', 'Active']}
            headers={['first_name', 'last_name', 'phone', 'email', 'active']}
          />
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
