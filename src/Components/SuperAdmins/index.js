import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSAdmin from './ListSAdmins/ListSAdmins';
import AddSAdmin from './FormAdd/AddSAdmin';
import Modal from './Modals/modal';

const SuperAdmins = () => {
  const [superAdmins, saveSuperAdmins] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (_id) => {
    saveSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
  };

  const addItem = ({ _id, firstName, lastName, email, password, active }) => {
    const newItem = {
      _id,
      firstName,
      lastName,
      email,
      password,
      active
    };
    saveSuperAdmins([...superAdmins, newItem]);
  };

  const closeForm = () => {
    setShowFormAdd(false);
  };
  const onClick = () => {
    setShowFormAdd(true);
  };

  return (
    <section className={styles.container}>
      <AddSAdmin
        addItem={addItem}
        show={showFormAdd}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
      />
      <h2>SuperAdmins List</h2>
      <ListSAdmin
        list={superAdmins}
        setList={saveSuperAdmins}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
      />
      <button onClick={onClick}>+ Add Super Admin</button>
      <Modal showTitle={showTitle} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default SuperAdmins;
