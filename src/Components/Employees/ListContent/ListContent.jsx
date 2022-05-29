import React, { useState } from 'react';
import ModalDelete from '../ModalDelete/ModalDelete';

const ListContent = ({ listContent, deleteItem }) => {
  const [showModal, setShowModal] = useState(false);
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
      return deleteItem(listContent._id);
    });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <tr>
      <ModalDelete title={'delete succssesfully'} show={showModal} closeModal={closeModal} />
      <td>{listContent._id}</td>
      <td>{listContent.first_name}</td>
      <td>{listContent.last_name}</td>
      <td>{listContent.email}</td>
      <td>{listContent.phone}</td>
      <td>
        <button onClick={onClick}>x</button>
        <button>Edit</button>
      </td>
    </tr>
  );
};

export default ListContent;
