import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, changeStatus } from 'redux/admins/thunks';
import Table from 'Components/Shared/Table/Table';
import AdminForm from 'Components/SuperAdmin/Admins/Form/AdminForm';
import Modal from 'Components/Shared/Modal/Modal';
import Button from 'Components/Shared/Buttons/Buttons';
import Loader from 'Components/Shared/Loader/Loader';
import styles from 'Components/SuperAdmin/Admins/admins.module.css';

const Admins = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const isLoading = useSelector((state) => state.admins.isLoading);

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [previousAdmin, setPreviousAdmin] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const listAdmins = useSelector((state) => state.admins.list);
  const listActiveAdmins = listAdmins.filter((admins) => admins.active == true);
  const listInactiveAdmins = listAdmins.filter((admins) => admins.active == false);
  const adminsSorted = listActiveAdmins.concat(listInactiveAdmins);

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want disable this Admin?')) {
      dispatch(changeStatus(_id, false));
    }
  };

  const handleActive = async (_id) => {
    if (confirm('Are you sure you want activate this Admin?')) {
      dispatch(changeStatus(_id, true));
    }
  };

  const handleEdit = (admin) => {
    if (admin.active == true) {
      setPreviousAdmin(admin);
      setShowForm(true);
    } else {
      setShowModal(true);
      setChildrenModal('You have to activate this admin to edit it');
    }
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
            headersColumns={['First Name', 'Last Name', 'Phone', 'Email', '', '']}
            headers={['firstName', 'lastName', 'phone', 'email']}
            deleteItem={handleDelete}
            activateItem={handleActive}
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
