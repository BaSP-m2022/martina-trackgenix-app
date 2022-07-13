import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import Table from 'Components/Shared/Table/Table';
import Loader from 'Components/Shared/Loader/Loader';
import styles from 'Components/SuperAdmin/Projects/projects.module.css';

const Projects = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.projects.isLoading);
  let listProject = useSelector((state) => state.projects.list);

  useEffect(() => {
    dispatch(getProjects());
  }, []);
  listProject = listProject.map((project) => {
    project.start_date = project.start_date.slice(0, 10);
    project.finish_date = project.finish_date.slice(0, 10);
    return project;
  });

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <section className={styles.container}>
          <Table
            title={'Projects'}
            data={listProject}
            headersColumns={['Project Name', 'Client', 'Start Date', 'Finish Date']}
            headers={['project_name', 'client', 'start_date', 'finish_date']}
          />
        </section>
      )}
    </>
  );
};

export default Projects;
