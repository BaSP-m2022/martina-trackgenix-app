import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSAdmin from './ListSAdmins/ListSAdmins';
import AddSAdmin from './FormAdd/AddSAdmin';

const SuperAdmins = () => {
  const [sAdmins, saveSAdmins] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);

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

  const closeForm = () => {
    setShowFormAdd(false);
  };
  const onClick = () => {
    setShowFormAdd(true);
  };
  return (
    <section className={styles.container}>
      <AddSAdmin show={showFormAdd} closeForm={closeForm} />
      <h2>SuperAdmins List</h2>
      <ListSAdmin list={sAdmins} setList={saveSAdmins} deleteItem={deleteItem} />
      <button onClick={onClick}>Add Super Admin</button>
    </section>
  );
};

export default SuperAdmins;
