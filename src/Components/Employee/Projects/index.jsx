import React, { useEffect } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';

const Projects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  let listProject = useSelector((state) => state.projects.list);
  const employeeId = '629d41966737e327d3189242';
  listProject = listProject.filter((project) => project.employees[0].id == employeeId);
  console.log(listProject);
  return (
    <Table
      title={'My Projects'}
      data={listProject}
      headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
    />
  );
};

export default Projects;
