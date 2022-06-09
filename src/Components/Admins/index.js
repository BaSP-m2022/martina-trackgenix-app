import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import AdminForm from './Form/AdminForm';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';

const Admins = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [previousAdmin, setPreviousAdmin] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: false
  });
  const [method, setMethod] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setList(data.data);
      setIsLoading(false);
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

  const openForm = () => {
    setMethod('POST');
    setShowForm(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <h2>Admins</h2>
          <AdminForm
            addItem={addItem}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            setIsLoading={setIsLoading}
            editItem={editItem}
            previousAdmin={previousAdmin}
            setPreviousAdmin={setPreviousAdmin}
            method={method}
          />
          <List
            deleteItem={deleteItem}
            list={list}
            setPreviousAdmin={setPreviousAdmin}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            setIsLoading={setIsLoading}
            setMethod={setMethod}
          />
          <Button onClick={openForm}>Add New Admin</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Admins;
