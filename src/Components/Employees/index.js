import React, { useEffect, useState } from 'react';
import ListBody from './ListBody/ListBody';
import styles from './employees.module.css';
import Modal from './Modals/Modal';
import AddEmployee from './AddForm/AddEmployee';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');

  // API REQUEST TO GET DATA
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
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

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {showModal && <Modal showModal={showModal} title={showTitle} setShowModal={setShowModal} />}
      <AddEmployee
        show={showFormAdd}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        newEmployee={newEmployee}
      />
      <ListBody
        employees={employees}
        setEmployees={setEmployees}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        editEmployee={editEmployee}
      />
      <button className={styles.addBtn} onClick={onClick}>
        ADD NEW
      </button>
    </section>
  );
};

export default Employees;
