import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import EditSAdmin from './FormEdit/EditSAdmin';

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

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div>
        {sAdmins.map((superAd) => (
          <EditSAdmin key={superAd._id} superAdmin={superAd} />
        ))}
      </div>
      <div>
        <a href="/super-admins/form">Add SuperAdmis</a>
      </div>
    </section>
  );
};

export default SuperAdmins;
