import React from 'react';
import Table from '../../Shared/Table/Table';

const List = ({
  list,
  setShowModal,
  setTitleModal,
  deleteItem,
  setLoading,
  setShowForm,
  setPreviousProject,
  setMethod
}) => {
  const handleDelete = async (_id) => {
    setLoading(true);
    if (confirm('Are you sure you want to remove this Project?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
          method: 'DELETE'
        });
        setShowModal(true);
        setTitleModal('Project deleted successfully');
        deleteItem(_id);
      } catch (error) {
        setShowModal(true);
        setTitleModal(error.msg);
        console.error(error);
      }
    }
    setLoading(false);
  };

  const handleEdit = (project) => {
    setMethod('PUT');
    setPreviousProject(project);
    setShowForm(true);
  };

  return (
    <Table
      title={'Projects'}
      data={list}
      headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
      deleteItem={() => handleDelete(list._id)}
      editItem={handleEdit}
    />
  );
};

export default List;
