import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import ModalJavi from './ModalJavi/ModalJavi';
import AddItem from './AddItem/AddItem';

const Admins = () => {
  const [list, setList] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeForm = () => {
    setShowFormAdd(false);
  };

  const onClick = () => {
    setShowFormAdd(true);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <AddItem
        show={showFormAdd}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
      />
      <List list={list} setList={setList} />
      <button onClick={onClick}>Add new admin</button>
      <ModalJavi showTitle={showTitle} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Admins;
