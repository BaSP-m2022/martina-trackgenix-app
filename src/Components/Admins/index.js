import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import AddItem from './AddItem/AddItem';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';

const Admins = () => {
  const [list, setList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setList(data.data);
      setShowLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = (_id) => {
    setList([...list.filter((listItem) => listItem._id !== _id)]);
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

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Loader show={showLoader} />
      <AddItem
        addItem={addItem}
        showFormAdd={showFormAdd}
        setShowFormAdd={setShowFormAdd}
        setShowModal={setShowModal}
        setChildrenModal={setChildrenModal}
        setShowLoader={setShowLoader}
      />
      <List
        list={list}
        deleteItem={deleteItem}
        editItem={editItem}
        setShowModal={setShowModal}
        setChildrenModal={setChildrenModal}
        setShowLoader={setShowLoader}
      />
      <Button onClick={() => setShowFormAdd(true)}>Add new admin</Button>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        {childrenModal}
      </Modal>
    </section>
  );
};

export default Admins;
