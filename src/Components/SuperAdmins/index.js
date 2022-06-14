import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/ListSuperAdmins';
import Form from './Form/SuperAdminForm';
import Modal from '../Shared/Modal/Modal';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins } from '../../redux/superAdmins/thunks';

const SuperAdmins = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmins.isLoading);

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [previousSuperAdmin, setPreviousSuperAdmin] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: true
  });

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const onClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <ListSuperAdmin setShowForm={setShowForm} setPreviousSuperAdmin={setPreviousSuperAdmin} />
          <Form
            showForm={showForm}
            setShowForm={setShowForm}
            previousSuperAdmin={previousSuperAdmin}
            setPreviousSuperAdmin={setPreviousSuperAdmin}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
          />
          <Button onClick={onClick}> Add Super Admin</Button>
          <Modal isOpen={showModal} handleClose={handleClose}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default SuperAdmins;
