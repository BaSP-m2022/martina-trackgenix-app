import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { softDelete } from 'redux/projects/thunks';

const List = ({ setShowForm, setPreviousProject, setShowModal, setTitleModal }) => {
  const dispatch = useDispatch();

  const listProject = useSelector((state) => state.projects.list);

  const listActiveProjects = listProject.filter((project) => project.active == true);

  const newListProject = listActiveProjects.map((item) => {
    return {
      ...item,
      active: item.active == true ? 'Active' : 'Inactive',
      start_date: item.start_date.slice(0, 10),
      finish_date: item.finish_date.slice(0, 10)
    };
  });

  const handleDelete = async (project) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      const responseProject = await dispatch(softDelete(project, project._id));
      if (!responseProject.error) {
        setShowModal(true);
        setTitleModal('Project deleted successfully');
      }
    }
  };

  const handleEdit = (project) => {
    setPreviousProject(project);
    setShowForm(true);
  };
  return (
    <Table
      title={'Projects'}
      data={newListProject}
      headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date', 'Status']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date', 'active']}
      deleteItem={handleDelete}
      editItem={handleEdit}
    />
  );
};

export default List;
