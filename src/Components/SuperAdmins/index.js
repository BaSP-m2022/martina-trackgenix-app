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
  const [method, setMethod] = useState('');
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

  // const deleteItem = (_id) => {
  //   saveSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
  // };

  // const addItem = (body) => {
  //   const newSuperAdmin = {
  //     _id: body._id,
  //     firstName: body.firstName,
  //     lastName: body.lastName,
  //     phone: body.phone,
  //     email: body.email,
  //     password: body.password,
  //     active: body.active
  //   };
  //   saveSuperAdmins([...superAdmins, newSuperAdmin]);
  // };

  // const editItem = (data) => {
  //   const superAdminUpdated = superAdmins.map((superAdmin) => {
  //     if (superAdmin._id === data._id) {
  //       return data;
  //     } else {
  //       return superAdmin;
  //     }
  //   });
  //   saveSuperAdmins(superAdminUpdated);
  // };

  const onClick = () => {
    setShowForm(true);
    setMethod('POST');
  };

  return isLoading ? (
    <Loader show={isLoading} />
  ) : (
    <section className={styles.container}>
      <ListSuperAdmin
        //list={superAdmins}
        //deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowForm={setShowForm}
        setPreviousSuperAdmin={setPreviousSuperAdmin}
        setMethod={setMethod}
      />
      <Form
        showForm={showForm}
        setShowForm={setShowForm}
        previousSuperAdmin={previousSuperAdmin}
        setPreviousSuperAdmin={setPreviousSuperAdmin}
        setShowModal={setShowModal}
        //editItem={editItem}
        method={method}
      />
      <Button onClick={onClick}> Add Super Admin</Button>
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </section>
  );
};

export default SuperAdmins;
