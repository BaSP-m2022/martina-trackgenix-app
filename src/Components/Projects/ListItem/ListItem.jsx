import React, { useState } from 'react';
import styles from './listItem.module.css';
import EditProject from '../FormEdit/EditProject';

const ListItem = ({ listItem, setShowModal, setTitleModal, deleteItem, editItem }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Project deleted successfully');
      deleteItem(_id);
    } catch (error) {
      setShowModal(true);
      setTitleModal(error.msg);
      console.error(error);
    }
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.project_name}</td>
      <td>{listItem.client}</td>
      <td>{listItem.start_date}</td>
      <td>{listItem.finish_date}</td>
      <td>{listItem.active.toString()}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
      <td>
        <EditProject
          key={listItem._id}
          showFormEdit={showFormEdit}
          setShowFormEdit={setShowFormEdit}
          previewProject={listItem}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          editItem={editItem}
        />
        <button onClick={() => setShowFormEdit(true)}>&#9998;</button>
      </td>
    </tr>
  );
};

export default ListItem;
