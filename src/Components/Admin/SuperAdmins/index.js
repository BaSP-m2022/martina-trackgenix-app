import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/ListSuperAdmins';
import Form from './Form/SuperAdminForm';
import { Loader, Button, Modal } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins } from '../../../redux/superAdmins/thunks';

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

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <h2>Super Admins</h2>
          <ListSuperAdmin
            setShowForm={setShowForm}
            setPreviousSuperAdmin={setPreviousSuperAdmin}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
          />
          <Form
            showForm={showForm}
            setShowForm={setShowForm}
            previousSuperAdmin={previousSuperAdmin}
            setPreviousSuperAdmin={setPreviousSuperAdmin}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
          />
          <Button onClick={() => setShowForm(true)}> Add Super Admin</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default SuperAdmins;
