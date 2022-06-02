import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/ListSuperAdmins';
import AddSuperAdmin from './FormAdd/AddSuperAdmin';
import Modal from './Modals/modal';

const SuperAdmins = () => {
  const [superAdmins, saveSuperAdmins] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  const [loading, setLoading] = useState(true);

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

  const addItem = ({ _id, firstName, lastName, email, password, active }) => {
    const newItem = {
      _id,
      firstName,
      lastName,
      email,
      password,
      active
    };
    saveSuperAdmins([...superAdmins, newItem]);
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

  const closeForm = () => {
    setShowFormAdd(false);
  };

  const onClick = () => {
    setShowFormAdd(true);
  };

  return loading ? (
    <section className={styles.containerLoading}>
      <div className={styles.loader}></div>
    </section>
  ) : (
    <section className={styles.container}>
      <AddSuperAdmin
        addItem={addItem}
        show={showFormAdd}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
      />
      <h2>SuperAdmins List</h2>
      <ListSuperAdmin
        list={superAdmins}
        setList={saveSuperAdmins}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        editItem={editItem}
      />
      <button onClick={onClick}>+ Add Super Admin</button>
      <Modal showTitle={showTitle} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default SuperAdmins;
