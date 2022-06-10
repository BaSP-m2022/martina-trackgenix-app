import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/ListSuperAdmins';
import Form from './Form/SuperAdminForm';
import Modal from '../Shared/Modal/Modal';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';

const SuperAdmins = () => {
  const [superAdmins, saveSuperAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState('');
  const [previousSuperAdmin, setPreviousSuperAdmin] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: true
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = (_id) => {
    saveSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
  };

  const addItem = (body) => {
    const newSuperAdmin = {
      _id: body._id,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      password: body.password,
      active: body.active
    };
    saveSuperAdmins([...superAdmins, newSuperAdmin]);
  };

  const editItem = (data) => {
    const superAdminUpdated = superAdmins.map((superAdmin) => {
      if (superAdmin._id === data._id) {
        return data;
      } else {
        return superAdmin;
      }
    });
    saveSuperAdmins(superAdminUpdated);
  };

  const onClick = () => {
    setShowForm(true);
    setMethod('POST');
  };

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <ListSuperAdmin
        list={superAdmins}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setShowForm={setShowForm}
        setPreviousSuperAdmin={setPreviousSuperAdmin}
        setLoading={setLoading}
        setMethod={setMethod}
      />
      <Form
        showForm={showForm}
        setShowForm={setShowForm}
        previousSuperAdmin={previousSuperAdmin}
        setPreviousSuperAdmin={setPreviousSuperAdmin}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        editItem={editItem}
        addItem={addItem}
        setLoading={setLoading}
        method={method}
      />
      <Button onClick={onClick}> Add Super Admin</Button>
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <p>{showTitle}</p>
      </Modal>
    </section>
  );
};

export default SuperAdmins;
