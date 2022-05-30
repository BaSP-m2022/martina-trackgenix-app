// import React, { useState } from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, setShowModal, setShowModalError }) => {
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      console.log('response', response);
    } catch (error) {
      console.error(error);
      setShowModalError(true);
    }
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.project_name}</td>
      <td>{listItem.client}</td>
      <td>{listItem.active.toString()}</td>
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
