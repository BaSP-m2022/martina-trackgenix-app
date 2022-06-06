import React, { useState } from 'react';
import styles from './listItemSAdmin.module.css';
import EditSuperAdmin from '../FormEdit/EditSuperAdmin';

const ListItemSuperAdmin = ({
  listItem,
  deleteItem,
  setShowModal,
  setShowTitle,
  editItem,
  setLoading
}) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const onClick = () => {
    setLoading(true);

    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const url = `${process.env.REACT_APP_API_URL}/super-admins/${listItem._id}`;

    fetch(url, options).then((response) => {
      if (
        response.status !== 200 &&
        response.status !== 201 &&
        response.status !== 204 &&
        response.status !== 304
      ) {
        setLoading(false);
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      setShowTitle('Super Admin deleted successfully');
      setShowModal(true);
      setLoading(false);
      return deleteItem(listItem._id);
    });
  };

  const closeForm = () => {
    setShowFormEdit(false);
  };

  const openForm = () => {
    setShowFormEdit(true);
  };

  return (
    <tr className={styles.container}>
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>{listItem.active.toString()}</td>
      <td>
        <button onClick={onClick}>X</button>
      </td>
      <td>
        <EditSuperAdmin
          key={listItem._id}
          show={showFormEdit}
          closeForm={closeForm}
          previewSuperAdmin={listItem}
          setShowModal={setShowModal}
          setShowTitle={setShowTitle}
          editItem={editItem}
          setLoading={setLoading}
        />
        <a>
          <button onClick={openForm}>&#9998;</button>
        </a>
      </td>
    </tr>
  );
};

export default ListItemSuperAdmin;
