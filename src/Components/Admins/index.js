import React, { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import AdminForm from './Form/AdminForm';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Buttons/Buttons';
import Loader from '../Shared/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';

const Admins = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.admins.isLoading);

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

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const openForm = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <h2>Admins</h2>
          <AdminForm
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previousAdmin={previousAdmin}
            setPreviousAdmin={setPreviousAdmin}
          />
          <List setPreviousAdmin={setPreviousAdmin} setShowForm={setShowForm} />
          <Button onClick={openForm}>Add New Admin</Button>
          <Modal isOpen={showModal} handleClose={handleClose}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Admins;
