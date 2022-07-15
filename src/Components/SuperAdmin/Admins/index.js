import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, softDeleteAdmin } from 'redux/admins/thunks';
import Table from 'Components/Shared/Table/Table';
import AdminForm from 'Components/SuperAdmin/Admins/Form/AdminForm';
import Modal from 'Components/Shared/Modal/Modal';
import Button from 'Components/Shared/Buttons/Buttons';
import Loader from 'Components/Shared/Loader/Loader';
import styles from 'Components/SuperAdmin/Admins/admins.module.css';

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

  const listAdmins = useSelector((state) => state.admins.list);
  const listActiveAdmins = listAdmins.filter((admins) => admins.active == true);
  const listInactiveAdmins = listAdmins.filter((admins) => admins.active == false);
  const adminsSorted = listActiveAdmins.concat(listInactiveAdmins);

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove the Admin?')) {
      dispatch(softDeleteAdmin(_id));
    }
  };

  const handleEdit = (admin) => {
    setPreviousAdmin(admin);
    setShowForm(true);
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
          <Table
            title={'Admins list'}
            data={adminsSorted}
            headersColumns={['Fist Name', 'Last Name', 'Phone', 'Email', '', '']}
            headers={['firstName', 'lastName', 'phone', 'email']}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
          <Button onClick={() => setShowForm(true)}>Add New Admin</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Admins;
