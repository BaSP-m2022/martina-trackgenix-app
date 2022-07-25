import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { changeStatus, getProjects } from 'redux/projects/thunks';

const List = ({ setShowForm, setPreviousProject, setShowModal, setTitleModal }) => {
  const dispatch = useDispatch();

  const listProjects = useSelector((state) => state.projects.list);

  const sortedProjects = listProjects
    .filter((project) => project.active == true)
    .concat(listProjects.filter((project) => project.active == false));

  const newListProject = sortedProjects.map((item) => {
    return {
      ...item,
      start_date: item.start_date.slice(0, 10),
      finish_date: item.finish_date.slice(0, 10)
    };
  });

  const projectData = newListProject.map((project) => {
    let employeesArray = [];
    project.employees.map((employee) => {
      let first_name = employee.id.first_name;
      let last_name = employee.id.last_name;

      let employeeData = {
        id: employee.id,
        rate: employee.rate,
        role: employee.role,
        _id: employee._id,
        first_name,
        last_name
      };
      employeesArray.push(employeeData);
    });
    return {
      _id: project._id,
      active: project.active,
      start_date: project.start_date.slice(0, 10),
      finish_date: project.finish_date.slice(0, 10),
      project_name: project.project_name,
      client: project.client,
      employees: employeesArray
    };
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      const responseProject = await dispatch(changeStatus(id, false));
      if (!responseProject.error) {
        setTitleModal('Project deleted successfully');
        setShowModal(true);
        dispatch(getProjects());
      }
    }
  };

  const activateProject = async (id) => {
    if (confirm('Are you sure you want to activate this Project?')) {
      const responseProject = await dispatch(changeStatus(id, true));
      if (!responseProject.error) {
        setTitleModal('Project activated successfully');
        setShowModal(true);
        dispatch(getProjects());
      }
    }
  };

  const handleEdit = (project) => {
    setPreviousProject(project);
    setShowForm(true);
  };

  const viewEmployees = (project) => {
    setTitleModal(
      <Table
        title={`${project.project_name}'s employees`}
        data={project.employees}
        headersColumns={['First Name', 'Last Name', 'Role', 'Rate']}
        headers={['first_name', 'last_name', 'role', 'rate']}
      />
    );
    setShowModal(true);
  };

  return (
    <Table
      title={'Projects'}
      data={projectData}
      headersColumns={['Project Name', 'Client', 'Start Date', 'Finish Date']}
      headers={['project_name', 'client', 'start_date', 'finish_date']}
      deleteItem={handleDelete}
      activateItem={activateProject}
      editItem={handleEdit}
      viewMore={viewEmployees}
    />
  );
};

export default List;
