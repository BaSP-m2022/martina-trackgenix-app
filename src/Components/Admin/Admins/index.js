import React, { useState, useEffect } from 'react';
import styles from 'Components/Admin/Admins/admins.module.css';
import List from 'Components/Admin/Admins/List/List';
import AdminForm from 'Components/Admin/Admins/Form/AdminForm';
import Modal from 'Components/Shared/Modal/Modal';
import Button from 'Components/Shared/Buttons/Buttons';
import Loader from 'Components/Shared/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from 'redux/admins/thunks';

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
