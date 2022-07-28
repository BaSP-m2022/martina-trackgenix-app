import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import Table from 'Components/Shared/Table/Table';
import Loader from 'Components/Shared/Loader/Loader';
import styles from 'Components/SuperAdmin/Employees/employees.module.css';

const Employees = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.employees.isLoading);
  const listEmployees = useSelector((state) => state.employees.list);
  const listActiveEmployees = listEmployees.filter((employee) => employee.active == true);
  const listInactiveEmployees = listEmployees.filter((employee) => employee.active == false);
  const employeesSorted = listActiveEmployees.concat(listInactiveEmployees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <Table
            title={'Employees'}
            data={employeesSorted}
            headersColumns={['First Name', 'Last Name', 'Phone', 'Email']}
            headers={['first_name', 'last_name', 'phone', 'email']}
          />
        </section>
      )}
    </>
  );
};

export default Employees;
