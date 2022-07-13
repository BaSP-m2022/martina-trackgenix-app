import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector } from 'react-redux/es/exports';

const List = () => {
  const listEmployees = useSelector((state) => state.employees.list);
  const listActiveEmployees = listEmployees.filter((employee) => employee.active == true);
  const listInactiveEmployees = listEmployees.filter((employee) => employee.active == false);
  const employeesSorted = listActiveEmployees.concat(listInactiveEmployees);

  for (let i = 0; i < employeesSorted.length; i++) {
    employeesSorted[i].active = employeesSorted[i].active.toString();
  }

  console.log('Sorted', employeesSorted);

  return (
    <Table
      title={'Employees'}
      data={employeesSorted}
      headersColumns={['Fist Name', 'Last Name', 'Phone', 'Email', 'Status']}
      headers={['first_name', 'last_name', 'phone', 'email', 'active']}
    />
  );
};

export default List;
