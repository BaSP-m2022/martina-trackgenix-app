import React, { useEffect, useState } from 'react';
import ListBody from './ListBody/ListBody';
import ModalDelete from './ModalDelete/ModalDelete';
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

  const closeForm = () => {
    setShowFormAdd(false);
  };
  const onClick = () => {
    setShowFormAdd(true);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {showModal && <ModalDelete title={showTitle} show={showModal} setShowModal={setShowModal} />}
      <AddEmployee
        show={showFormAdd}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
      />
      <ListBody
        employees={employees}
        setEmployees={setEmployees}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
      />
      <button onClick={onClick}>ADD NEW</button>
      <Modal showTitle={showTitle} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Employees;
