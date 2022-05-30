import React from 'react';
import EditSAdmin from '../FormEdit/EditSAdmin';

const ListItemSAdmin = ({ listItem, deleteItem, setShowModal }) => {
  const onClick = () => {
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
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      setShowModal(true);
      return deleteItem(listItem._id);
    });
  };

  const editItem = (listItem) => {
    return <EditSAdmin previewSuperAdmin={listItem} />;
  };
  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>{listItem.active}</td>
      <td>
        <button onClick={onClick}>X</button>
      </td>
      <td>
        <a href={`/super-admins/form-edit?id=${listItem._id}`} key={listItem._id}>
          <button onClick={editItem(listItem)}>Edit</button>
        </a>
      </td>
    </tr>
  );
};

export default ListItemSAdmin;
