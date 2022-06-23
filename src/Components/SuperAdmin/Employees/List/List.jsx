import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { deleteEmployee } from 'redux/employees/thunks';

const List = ({ setShowForm, setPreviewsEmployee }) => {
  const employees = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove the Employee?')) {
      dispatch(deleteEmployee(_id));
    }
  };

  const handleEdit = (employee) => {
    setPreviewsEmployee(employee);
    setShowForm(true);
  };

  return (
    <Table
      title={'Employees'}
      data={employees}
      headersColumns={['ID', 'Fist Name', 'Last Name', 'Phone', 'Email']}
      headers={['_id', 'first_name', 'last_name', 'phone', 'email']}
      deleteItem={handleDelete}
      editItem={handleEdit}
    />
  );
};

export default List;
