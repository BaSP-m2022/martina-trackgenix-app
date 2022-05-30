import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
// import EditSAdmin from './FormEdit/EditSAdmin';
import ListSAdmin from './ListSAdmins/ListSAdmins';

const SuperAdmins = () => {
  const [sAdmins, saveSAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      saveSAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (_id) => {
    saveSAdmins([...sAdmins.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <ListSAdmin list={sAdmins} setList={saveSAdmins} deleteItem={deleteItem} />
      <h2>SuperAdmins</h2>
      <div>
        <a href="/super-admins/form">Add SuperAdmis</a>
      </div>
    </section>
  );
};

export default SuperAdmins;
