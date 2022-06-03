import React, { useState } from 'react';
import styles from './listItem.module.css';
import EditItem from '../EditItem/EditItem';

const ListItem = ({ listItem, setShowModal, setTitleModal, setShowTitle, editItem }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Admin deleted successfully');
    } catch (error) {
      setShowModal(true);
      setTitleModal(error.msg);
      console.error(error);
    }
  };

  const closeForm = () => {
    setShowFormEdit(false);
  };
  const openForm = () => {
    setShowFormEdit(true);
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.phone}</td>
      <td>{listItem.email}</td>
      <td>
        <EditItem
          key={listItem._id}
          show={showFormEdit}
          setShowFormEdit={setShowFormEdit}
          closeForm={closeForm}
          previewAdmin={listItem}
          setShowModal={setShowModal}
          setShowTitle={setShowTitle}
          editItem={editItem}
        />
        <button onClick={openForm}>Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
