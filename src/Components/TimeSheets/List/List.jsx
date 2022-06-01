import React, { useState } from 'react';
import ListItem from '../ListItem/ListTimeSheet';
import styles from './list.module.css';
import Modal from '../Modal/Modal';

const List = ({ list, deleteItem }) => {
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
            <th id="employee">EMPLOYEE</th>
            <th id="project">PROJECT</th>
            <th id="task">TASK</th>
            <th id="hs_worked">HOURS WORKED</th>
            <th id="timesheetDate">DATE</th>
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
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;