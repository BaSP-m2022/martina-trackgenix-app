import React from 'react';
import Table from '../../Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from '../../../redux/projects/thunks';

const List = ({ setShowForm, setPreviousProject, setMethod }) => {
  const listProject = useSelector((state) => state.projects.list);

  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      dispatch(deleteProject(_id));
    }
  };

  const handleEdit = (project) => {
    setMethod('PUT');
    setPreviousProject(project);
    setShowForm(true);
  };

  return (
    <Table
      title={'Projects'}
      data={listProject}
      headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
      deleteItem={handleDelete}
      editItem={handleEdit}
    />
  );
};

export default List;
