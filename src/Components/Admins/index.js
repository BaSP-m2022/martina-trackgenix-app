import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import ModalJavi from './ModalJavi/ModalJavi';
import AddItem from './AddItem/AddItem';

const Admins = () => {
  const [list, setList] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showTitle, setShowTitle] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = (id) => {
    setList([...list.filter((listItem) => listItem.id !== id)]);
  };

  const addItem = ({ _id, firstName, lastName, phone, email, password, active }) => {
    const newItem = {
      _id,
      firstName,
      lastName,
      phone,
      email,
      password,
      active
    };
    setList([...list, newItem]);
  };

  const editItem = (data) => {
    const adminUpd = list.map((admin) => {
      if (admin._id === data._id) {
        return data;
      } else {
        return admin;
      }
    });
    setList(adminUpd);
  };

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
        addItem={addItem}
        show={showFormAdd}
        closeForm={closeForm}
        setShowTitle={setShowTitle}
      />
      <List list={list} setList={setList} deleteItem={deleteItem} editItem={editItem} />
      <button onClick={onClick} className={styles.addButton}>
        Add new admin
      </button>
      <ModalJavi showTitle={showTitle} />
    </section>
  );
};

export default Admins;
