import React, { useState } from 'react';
import styles from './listItem.module.css';
import EditProject from '../FormEdit/EditProject';
import Button from '../../Shared/Buttons/Buttons';

const ListItem = ({ listItem, setShowModal, setTitleModal, deleteItem, editItem, setLoading }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Project deleted successfully');
      deleteItem(_id);
      setLoading(false);
    } catch (error) {
      setShowModal(true);
      setTitleModal(error.msg);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.project_name}</td>
      <td>{listItem.client}</td>
      <td>{listItem.start_date.toString().slice(0, 10)}</td>
      <td>{listItem.finish_date.toString().slice(0, 10)}</td>
      <td>{listItem.active.toString()}</td>
      <td>
        <Button
          onClick={() => {
            handleDelete(listItem._id);
          }}
        >
          X
        </Button>
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
          setLoading={setLoading}
        />
        <Button
          onClick={() => {
            setShowFormEdit(true);
          }}
        >
          &#9998;
        </Button>
      </td>
    </tr>
  );
};

export default ListItem;
