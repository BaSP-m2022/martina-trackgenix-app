import React from 'react';
import styles from './listTimeSheet.module.css';

const ListTimeSheet = ({ listItem, setShowModal, setTitleModal, deleteItem }) => {
  const handleDelete = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Time-sheet deleted successfully');
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
      <td>{listItem.employee.first_name}</td>
      <td>{listItem.project.project_name}</td>
      <td>{listItem.task.description}</td>
      <td>{listItem.hs_worked}</td>
      <td>{listItem.timesheetDate}</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>x</button>
      </td>
    </tr>
  );
};

export default ListTimeSheet;