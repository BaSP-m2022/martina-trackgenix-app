import React from 'react';
import styles from './listSAdmins.module.css';
import ListItemSuperAdmin from '../ListItemSuperAdmin/LIstItemSuperAdmin';

const ListSAdmin = ({ list, deleteItem, setShowModal, setShowTitle, editItem, setLoading }) => {
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
          <th id="delete">Delete Super Admin</th>
          <th id="edit">Edit Super Admin</th>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItemSuperAdmin
              key={item._id}
              listItem={item}
              deleteItem={deleteItem}
              setShowModal={setShowModal}
              setShowTitle={setShowTitle}
              editItem={editItem}
              setLoading={setLoading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSAdmin;
