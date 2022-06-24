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
            data={listProjectEmployee}
            headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
            headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
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
