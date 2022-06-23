import React, { useEffect } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import Loader from 'Components/Shared/Loader/Loader';

const Projects = () => {
  const isLoading = useSelector((state) => state.projects.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const listProject = useSelector((state) => state.projects.list);
  const employeeId = '629d41966737e327d3189242';
  const listProjectEmployee = listProject.filter(
    (project) => project.employees[0].id == employeeId
  );
  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <Table
          title={'My Projects'}
          data={listProjectEmployee}
          headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
          headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
        />
      )}
      ;
    </>
  );
};

export default Projects;
