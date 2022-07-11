import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector } from 'react-redux/es/exports';

const List = () => {
  const listEmployees = useSelector((state) => state.employees.list);
  const listActiveEmployees = listEmployees.filter((employee) => employee.active == true);
  const listInactiveEmployees = listEmployees.filter((employee) => employee.active == false);
  const employees = listActiveEmployees.concat(listInactiveEmployees);

  return (
    <Table
      title={'Employees'}
      data={employees}
      headersColumns={['Fist Name', 'Last Name', 'Phone', 'Email', 'Status']}
      headers={['first_name', 'last_name', 'phone', 'email', 'active']}
    />
  );
};

export default List;
