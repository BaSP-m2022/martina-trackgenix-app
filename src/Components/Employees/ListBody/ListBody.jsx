import React from 'react';
import ListContent from '../ListContent/ListContent';
import styles from './ListBody.module.css';

const ListBody = ({ employees, deleteItem, setShowModal }) => {
  return (
    <div className={styles.body}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="first_name">Name</th>
            <th id="last_name">Last name</th>
            <th id="email">Email</th>
            <th id="phone">Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <ListContent
              key={employee._id}
              listContent={employee}
              deleteItem={deleteItem}
              setShowModal={setShowModal}
            />
          ))}
        </tbody>
      </table>
      <button className={styles.newEm}>
        <a href="/employees/form">ADD NEW</a>
      </button>
    </div>
  );
};

export default ListBody;
