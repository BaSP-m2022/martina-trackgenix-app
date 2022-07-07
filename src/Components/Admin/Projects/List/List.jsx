import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { softDelete } from 'redux/projects/thunks';
import styles from './list.module.css';

const List = ({ setShowForm, setPreviousProject, setShowModal, setTitleModal }) => {
  const dispatch = useDispatch();

  const listProjects = useSelector((state) => state.projects.list);
  const listEmployees = useSelector((state) => state.employees.list);

  const listActiveProjects = listProjects.filter((project) => project.active == true);

  const newListProject = listActiveProjects.map((item) => {
    return {
      ...item,
      active: item.active == true ? 'Active' : 'Inactive',
      start_date: item.start_date.slice(0, 10),
      finish_date: item.finish_date.slice(0, 10)
    };
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      const responseProject = dispatch(softDelete(id));
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

  const viewEmployees = (project) => {
    setShowModal(true);
    setTitleModal(
      project.employees.map((employee) => {
        return listEmployees.find((emp) => employee.id === emp._id);
      })[0] == undefined ? (
        <span>No employees assigned to this project</span>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {['First Name', 'Last Name', 'Role', 'Rate'].map((headersColumns, index) => {
                return <th key={index}>{headersColumns}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {project.employees.map((employee) => {
              return (
                <tr className={styles.tr} key={employee._id}>
                  <td>{listEmployees.find((item) => employee.id === item._id).first_name}</td>
                  <td>{listEmployees.find((item) => employee.id === item._id).last_name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.rate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
    );
  };

  return (
    <Table
      title={'Projects'}
      data={newListProject}
      headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date', 'Status']}
      headers={['_id', 'project_name', 'client', 'start_date', 'finish_date', 'active']}
      deleteItem={handleDelete}
      editItem={handleEdit}
      viewEmployees={viewEmployees}
    />
  );
};

export default List;
