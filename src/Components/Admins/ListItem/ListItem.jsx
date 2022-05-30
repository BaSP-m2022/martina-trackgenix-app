import React from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, setShowModal, setTitleModal }) => {
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Admin deleted successfully');
      console.log('response', response);
    } catch (error) {
      setShowModal(true);
      setTitleModal(error.msg);
      console.error(error);
    }
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.phone}</td>
      <td>{listItem.email}</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
