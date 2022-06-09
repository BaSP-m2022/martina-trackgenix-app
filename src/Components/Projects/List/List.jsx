import React from 'react';
import Table from '../../Shared/Table/Table';

const List = ({ list, deleteItem, editItem }) => {
  return (
    <Table
      title={'Projects'}
      data={list}
      headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
      deleteItem={deleteItem}
      editItem={editItem}
    />
  );
};

export default List;
