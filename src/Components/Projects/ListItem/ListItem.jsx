import React, { useState } from 'react';
import styles from './listItem.module.css';
import EditProject from '../FormEdit/EditProject';
import Row from '../../Shared/Row/Row';

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
      <th id="id">ID</th>
      <th id="project_name">Project Name</th>
      <th id="client">Client</th>
      <th id="start_date">Start Date</th>
      <th id="finish_date">Finish Date</th>
      <th id="active">Active</th>

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
      <tbody>
        {listItem.map((item) => {
          return (
            <Row
              key={item._id}
              data={item}
              headers={['id', 'project_name', 'client', 'start_date', 'finish_date', 'active']}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          );
        })}
      </tbody>
    </tr>
  );
};

export default ListItem;
