import React from 'react';
import styles from './ListContent.module.css';

const ListContent = ({ listContent, deleteItem, setShowModal }) => {
  const onClick = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const url = `${process.env.REACT_APP_API_URL}/employees/${listContent._id}`;
    fetch(url, options).then(async (response) => {
      if (
        response.status !== 200 &&
        response.status !== 201 &&
        response.status !== 204 &&
        response.status !== 304
      ) {
        const { message } = await response.json();
        throw new Error(message);
      }
      setShowModal(true);
      return deleteItem(listContent._id);
    });
  };

  return (
    <tr className={styles.content}>
      <td>{listContent._id}</td>
      <td>{listContent.first_name}</td>
      <td>{listContent.last_name}</td>
      <td>{listContent.email}</td>
      <td>{listContent.phone}</td>
      <td>
        <button onClick={onClick} className={styles.butX}>
          x
        </button>
        <button className={styles.butEdit}>Edit</button>
      </td>
    </tr>
  );
};

export default ListContent;
