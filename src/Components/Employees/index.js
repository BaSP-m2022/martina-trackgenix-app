import { useEffect, useState } from 'react';
import styles from './employees.module.css';

const Employees = () => {
  const [employees, saveEmployees] = useState([]);
  console.log(employees);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        {employees.map((employee) => {
          // eslint-disable-next-line prettier/prettier
          return (
            <div key={employee._id}>
              {employee.first_name} {employee.last_name}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Employees;
