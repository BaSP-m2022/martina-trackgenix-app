import React from 'react';
//import Table from '../../Shared/Table/Table';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import { useSelector, useDispatch } from 'react-redux'; //useSelector
import { deleteProject } from '../../../redux/projects/thunks';

const List = ({
  //list,
  //setShowModal,
  //setTitleModal,
  //deleteItem,
  //setLoading,
  setShowForm,
  setPreviousProject,
  setMethod
}) => {
  const listProject = useSelector((state) => state.projects.list);

  const dispatch = useDispatch();

  const deleteItem = async (_id) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      dispatch(deleteProject(_id));
    }
  };

  const editItem = (project) => {
    setMethod('PUT');
    setPreviousProject(project);
    setShowForm(true);
  };

  return (
    //<Table
    //  title={'Projects'}
    //  data={list}
    //  headersColumns={['ID', 'Project Name', 'Client', 'Start Date', 'Finish Date']}
    //  headers={['_id', 'project_name', 'client', 'start_date', 'finish_date']}
    //  deleteItem={handleDelete}
    //  editItem={handleEdit}
    ///>
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="project_name">Project Name</th>
            <th id="client">Client</th>
            <th id="start_date">Start Date</th>
            <th id="finish_date">Finish Date</th>
          </tr>
        </thead>
        <tbody>
          {listProject.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={['_id', 'project_name', 'client', 'start_date', 'finish_date', 'active']}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
