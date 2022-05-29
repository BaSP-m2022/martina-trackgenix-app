import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List/List';

const Admins = () => {
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      console.log('response', response);
      alert('delete successfully');
    } catch (error) {
      console.error(error);
    }

    setList(list.filter((listItem) => listItem._id !== _id));
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <List list={list} setList={setList} deleteItem={deleteItem} />
    </section>
  );
};

export default Admins;
