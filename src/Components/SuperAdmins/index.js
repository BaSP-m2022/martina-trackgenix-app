import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/ListSuperAdmins';
// import AddSuperAdmin from './FormAdd/AddSuperAdmin';
import EditSuperAdmin from './FormEdit/EditSuperAdmin';
import Modal from '../Shared/Modal/Modal';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';

const SuperAdmins = () => {
  const [superAdmins, saveSuperAdmins] = useState([]);
  // const [showFormAdd, setShowFormAdd] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [previewSuperAdmin, setPreviewSuperAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: true
  });
  const [action, setAction] = useState('');

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

  // const addItem = ({ _id, firstName, lastName, email, password, active }) => {
  //   const newItem = {
  //     _id,
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     active
  //   };
  //   saveSuperAdmins([...superAdmins, newItem]);
  // };

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
    setShowFormEdit(true);
    setAction('add');
  };

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      {/* <AddSuperAdmin
        addItem={addItem}
        showFormAdd={showFormAdd}
        setShowFormAdd={setShowFormAdd}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setLoading={setLoading}
      /> */}
      <h2>SuperAdmins List</h2>
      <ListSuperAdmin
        list={superAdmins}
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setShowFormEdit={setShowFormEdit}
        setPreviewSuperAdmin={setPreviewSuperAdmin}
        setLoading={setLoading}
      />
      <EditSuperAdmin
        action={action}
        showFormEdit={showFormEdit}
        setShowFormEdit={setShowFormEdit}
        previewSuperAdmin={previewSuperAdmin}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setList={editItem}
        setLoading={setLoading}
      />
      <Button onClick={onClick}> Add Super Admin</Button>
      <Loader show={loading} />
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
