import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';
import Modal from '../Modal/Modal';
import ModalError from '../Modal/ModalError';

const List = ({ list, deleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setShowModalError(false);
  };

  return (
    <section className={styles.container}>
      <Modal title={'Project deleted successfully'} show={showModal} closeModal={closeModal} />
      <ModalError title={'There was an error'} show={showModalError} closeModal={closeModal} />
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="project_name">Project Name</th>
            <th id="client">Client</th>
            <th id="active">Active</th>
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
