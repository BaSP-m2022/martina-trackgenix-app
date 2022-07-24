import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { softDelete } from 'redux/projects/thunks';

const List = ({ setShowForm, setPreviousProject, setShowModal, setTitleModal }) => {
  const dispatch = useDispatch();

  const listProjects = useSelector((state) => state.projects.list);
  console.log('Proyectos: ', listProjects);

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

  console.log('Lista de proyectos:', listProjects);

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
      const responseProject = dispatch(softDelete(id, false));
      if (!responseProject.error) {
        setTitleModal('Project deleted successfully');
        setShowModal(true);
      }
    }
  };

  const activateProject = async (id) => {
    if (confirm('Are you sure you want to activate this Project?')) {
      const responseProject = dispatch(softDelete(id, true));
      if (!responseProject.error) {
        setTitleModal('Project activated successfully');
        setShowModal(true);
      }
    }
  };

  const handleEdit = (project) => {
    setPreviousProject(project);
    setShowForm(true);
  };

  const viewEmployees = (project) => {
    console.log('vacio?', project);
    setTitleModal(
      <Table
        title={`${project.project_name}'s employees`}
        data={project.employees}
        headersColumns={['First Name', 'Last Name', 'Role', 'Rate']}
        headers={['first_name', 'last_name', 'role', 'rate']}
      />
    );
    // setTitleModal(
    //   <table className={styles.table}>
    //     <thead>
    //       <tr>
    //         {['First Name', 'Last Name', 'Role', 'Rate'].map((headersColumns, index) => {
    //           return <th key={index}>{headersColumns}</th>;
    //         })}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {project.employees.map((employee) => {
    //         return (
    //           <tr className={styles.tr} key={employee.id._id}>
    //             <td>{employee.id.first_name}</td>
    //             <td>{employee.id.last_name}</td>
    //             <td>{employee.role}</td>
    //             <td>{employee.rate}</td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // );
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
