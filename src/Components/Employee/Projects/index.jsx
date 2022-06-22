import React, { useEffect } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import Loader from '../../Shared/Loader/Loader';

const Projects = () => {
  const isLoading = useSelector((state) => state.projects.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  let listProject = useSelector((state) => state.projects.list);
  const employeeId = '629d41966737e327d3189242';
  listProject = listProject.filter((project) => project.employees[0].id == employeeId);
  console.log(listProject);
  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <Table
          title={'My Projects'}
          data={listProject}
          headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
          headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
        />
      )}
      ;
    </>
  );
};

export default Projects;
