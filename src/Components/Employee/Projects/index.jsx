import React, { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import Loader from 'Components/Shared/Loader/Loader';
import Modal from 'Components/Shared/Modal/Modal';

const Projects = () => {
  const isLoading = useSelector((state) => state.projects.isLoading);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const listProject = useSelector((state) => state.projects.list);
  const employeeId = '629d41966737e327d3189242';
  const listProjectEmployee = listProject.filter(
    (project) => project.employees[0].id == employeeId
  );

  const newProject = listProjectEmployee.map((item) => {
    return {
      _id: item._id,
      active: item.active,
      start_date: item.start_date.slice(0, 10),
      finish_date: item.finish_date.slice(0, 10),
      project_name: item.project_name,
      client: item.client
    };
  });

  const handleDelete = () => {
    setShowModal(true);
    setChildrenModal('You cannot delete project');
  };

  const handleEdit = () => {
    setShowModal(true);
    setChildrenModal('You cannot edit project');
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section>
          <Table
            title={'My Projects'}
            data={newProject}
            headersColumns={['ID', 'Role', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
            headers={['_id', 'role', 'project_name', 'client', 'start_date', 'finish_date']}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default Projects;
