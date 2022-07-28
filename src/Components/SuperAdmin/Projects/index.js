import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { Loader, Table } from 'Components/Shared';
import styles from 'Components/SuperAdmin/Projects/projects.module.css';

const Projects = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.projects.isLoading);
  let listProjects = useSelector((state) => state.projects.list);
  const listActiveProjects = listProjects.filter((projects) => projects.active == true);
  const listInactiveProjects = listProjects.filter((projects) => projects.active == false);
  const projectsSorted = listActiveProjects.concat(listInactiveProjects);

  useEffect(() => {
    dispatch(getProjects());
  }, []);
  listProjects = listProjects.map((project) => {
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
            data={projectsSorted}
            headersColumns={['Project Name', 'Client', 'Start Date', 'Finish Date']}
            headers={['project_name', 'client', 'start_date', 'finish_date']}
          />
        </section>
      )}
    </>
  );
};

export default Projects;
