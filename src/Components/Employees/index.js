import React, { useEffect, useState } from 'react';
import ListBody from './ListBody/ListBody';
// import ModalDelete from './ModalDelete/ModalDelete';
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
    const NewEmployee = {
      _id: body._id,
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      email: body.email,
      password: body.password,
      active: body.active
    };
    setEmployees([...employees, NewEmployee]);
  };

  // PUT EMPLOYEE

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
      />
      <button className={styles.addBtn} onClick={onClick}>
        ADD NEW
      </button>
      <Modal showTitle={showTitle} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Employees;
