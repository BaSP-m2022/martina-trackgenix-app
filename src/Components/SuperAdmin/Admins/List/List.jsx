import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { deleteAdmin } from 'redux/admins/thunks';

const List = ({ setShowForm, setPreviousAdmin }) => {
  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins.list);

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove the Admin?')) {
      dispatch(deleteAdmin(_id));
    }
  };

  const handleEdit = (admin) => {
    setPreviousAdmin(admin);
    setShowForm(true);
  };

  return (
    <Table
      title={'Admins'}
      data={admins}
      headersColumns={['ID', 'Fist Name', 'Last Name', 'Phone', 'Email']}
      headers={['_id', 'firstName', 'lastName', 'phone', 'email']}
      deleteItem={handleDelete}
      editItem={handleEdit}
    />
  );
};

export default List;
