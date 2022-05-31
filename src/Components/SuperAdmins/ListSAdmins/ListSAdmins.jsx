import React from 'react';
import styles from './listSAdmins.module.css';
import ListItemSAdmin from '../ListItemSAdmin/LIstItemSAdmin';

const ListSAdmin = ({ list, deleteItem, setShowModal, setShowTitle }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <th id="id">ID</th>
          <th id="firstName">First Name</th>
          <th id="lastName">Last Name</th>
          <th id="email">Email</th>
          <th id="password">Password</th>
          <th id="active">Active</th>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItemSAdmin
              key={item._id}
              listItem={item}
              deleteItem={deleteItem}
              setShowModal={setShowModal}
              setShowTitle={setShowTitle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSAdmin;
