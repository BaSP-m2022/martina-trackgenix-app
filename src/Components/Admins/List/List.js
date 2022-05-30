import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';
import Modal from '../Modal/modal';
import ModalError from '../Modal/modalError';

const List = ({ list, deleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setShowModalError(false);
  };

  return (
    <section className={styles.container}>
      <Modal title={'Admin deleted successfully'} show={showModal} closeModal={closeModal} />
      <ModalError title={'There was an error'} show={showModalError} closeModal={closeModal} />
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="firstName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="phone">Phone</th>
            <th id="email">Email</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <ListItem
                key={item._id}
                listItem={item}
                deleteItem={deleteItem}
                setShowModal={setShowModal}
                setShowModalError={setShowModalError}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
