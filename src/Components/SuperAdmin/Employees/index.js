import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import Table from 'Components/Shared/Table/Table';
import Loader from 'Components/Shared/Loader/Loader';
import styles from 'Components/SuperAdmin/Employees/employees.module.css';

const Employees = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.employees.isLoading);
  const employees = useSelector((state) => state.employees.list);

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
            data={employees}
            headersColumns={['Fist Name', 'Last Name', 'Phone', 'Email']}
            headers={['first_name', 'last_name', 'phone', 'email']}
          />
        </section>
      )}
    </>
  );
};

export default Employees;
