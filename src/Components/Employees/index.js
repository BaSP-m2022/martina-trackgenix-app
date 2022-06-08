import React, { useEffect, useState } from 'react';
import ListBody from './ListBody/ListBody';
import styles from './employees.module.css';
import AddEmployee from './AddForm/AddEmployee';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';
import Modal from '../Shared/Modal/Modal';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // API REQUEST TO GET DATA
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // DELETE ITEM
  const deleteItem = (_id) => {
    setEmployees([...employees.filter((employees) => employees._id !== _id)]);
  };

  // POST EMPLOYEE
  const newEmployee = (body) => {
    const newEmployee = {
      _id: body._id,
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      email: body.email,
      password: body.password,
      active: body.active
    };
    setEmployees([...employees, newEmployee]);
  };

  // PUT EMPLOYEE

  const editEmployee = (body) => {
    const employeesUpdated = employees.map((employee) => {
      if (employee._id === body._id) {
        return body;
      } else {
        return employee;
      }
    });
    setEmployees(employeesUpdated);
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
      <h2>Employees</h2>
      {showModal && <Modal showModal={showModal} title={showTitle} setShowModal={setShowModal} />}
      <AddEmployee
        show={showFormAdd}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        newEmployee={newEmployee}
        setLoading={setLoading}
      />
      <ListBody
        employees={employees}
        setEmployees={setEmployees}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        editEmployee={editEmployee}
        setLoading={setLoading}
      />
      <Button onClick={onClick}>ADD NEW</Button>
      <Loader show={loading} />
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <p>{showTitle}</p>
      </Modal>
    </section>
  );
};

export default Employees;
