import React from 'react';
import Table from '../../Shared/Table/Table';

const List = ({ list, deleteItem, editItem }) => {
  return (
    <Table
      title={'Projects'}
      data={list}
      headersName={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date', 'Status']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date', 'active']}
      deleteItem={deleteItem}
      editItem={editItem}
    />
  );
};

export default List;
