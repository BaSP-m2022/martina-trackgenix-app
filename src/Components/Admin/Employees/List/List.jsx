import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector } from 'react-redux/es/exports';

const List = () => {
  const employees = useSelector((state) => state.employees.list);

  return (
    <Table
      title={'Employees'}
      data={employees}
      headersColumns={['ID', 'Fist Name', 'Last Name', 'Phone', 'Email']}
      headers={['_id', 'first_name', 'last_name', 'phone', 'email']}
    />
  );
};

export default List;
