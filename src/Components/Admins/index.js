import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import AdminForm from './Form/AdminForm';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminsError, getAdminsSuccess } from '../../redux/admins/actions';

const Admins = () => {
  const dispatch = useDispatch();

  const getAdminsFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      dispatch(getAdminsSuccess(data.data));
    } catch (error) {
      dispatch(getAdminsError(error));
    }
  };

  // eslint-disable-next-line prettier/prettier
  const admins = useSelector(state => state.admins.list);
  // eslint-disable-next-line prettier/prettier
  const isLoading = useSelector(state => state.admins.isLoading);

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

  useEffect(() => {
    getAdminsFetch();
  }, []);

  // const deleteItem = (_id) => {
  //   setList([...list.filter((listItem) => listItem._id !== _id)]);
  // };

  // const addItem = ({ _id, firstName, lastName, phone, email, password, active }) => {
  //   const newItem = {
  //     _id,
  //     firstName,
  //     lastName,
  //     phone,
  //     email,
  //     password,
  //     active
  //   };
  //   setList([...list, newItem]);
  // };

  // const editItem = (data) => {
  //   const adminUpd = list.map((admin) => {
  //     if (admin._id === data._id) {
  //       return data;
  //     } else {
  //       return admin;
  //     }
  //   });
  //   setList(adminUpd);
  // };

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
            // addItem={addItem}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            // setIsLoading={setIsLoading}
            // editItem={editItem}
            previousAdmin={previousAdmin}
            setPreviousAdmin={setPreviousAdmin}
            method={method}
          />
          <List
            // deleteItem={deleteItem}
            list={admins}
            setPreviousAdmin={setPreviousAdmin}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            // setIsLoading={setIsLoading}
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
