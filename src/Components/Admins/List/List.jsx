import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';
import Modal from '../Modal/Modal';

const List = ({ list, deleteItem, editItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal title={titleModal} show={showModal} closeModal={closeModal} />
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
                setTitleModal={setTitleModal}
                editItem={editItem}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
