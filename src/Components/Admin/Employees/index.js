import React, { useEffect } from 'react';
import styles from 'Components/Admin/Employees/employees.module.css';
import Loader from 'Components/Shared/Loader/Loader';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';

const Employees = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const listEmployees = useSelector((state) => state.employees.list);
  const listActiveEmployees = listEmployees.filter((employee) => employee.active == true);
  const listInactiveEmployees = listEmployees.filter((employee) => employee.active == false);
  const employeesSorted = listActiveEmployees.concat(listInactiveEmployees);

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
