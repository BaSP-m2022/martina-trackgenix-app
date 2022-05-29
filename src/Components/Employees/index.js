import { useEffect, useState } from 'react';
import ListBody from './ListBody/ListBody';
import styles from './employees.module.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  // API REQUEST TO GET DATA
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  // DELETE ITEM
  const deleteItem = (_id) => {
    setEmployees([...employees.filter((employees) => employees._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <ListBody employees={employees} setEmployees={setEmployees} deleteItem={deleteItem} />
    </section>
  );
};

export default Employees;
