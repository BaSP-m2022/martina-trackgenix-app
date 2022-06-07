import React, { useState } from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import EditTimeSheet from '../Edit/EditTimeSheet';

const List = ({ list, setShowModal, setTitleModal, deleteItem, editTimeSheet, setLoading }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Time-sheet deleted successfully');
      deleteItem(_id);
      setLoading(false);
    } catch (error) {
      setShowModal(true);
      setTitleModal(error.msg);
      setLoading(false);
      console.error(error);
    }
  };

  const closeForm = () => {
    setShowFormEdit(false);
  };

  const openForm = () => {
    setShowFormEdit(true);
  };

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="_id">ID</th>
            <th id="employee">EMPLOYEE</th>
            <th id="hs_worked">HOURS WORKED</th>
            <th id="task">TASK</th>
            <th id="project">PROJECT</th>
            <th id="timesheetDate">DATE</th>
            <th id="edit">EDIT</th>
            <th id="delete">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={[
                  '_id',
                  'employee.first_name',
                  'hs_worked',
                  'project.project_name',
                  'task.description',
                  'timesheetDate'
                ]}
                deleteItem={() => handleDelete(item._id)}
                editItem={() => setShowFormEdit(true)}
                openForm={openForm}
              >
                <EditTimeSheet
                  key={item._id}
                  show={showFormEdit}
                  setShowFormEdit={setShowFormEdit}
                  closeForm={closeForm}
                  previewTimeSheet={item}
                  setShowModal={setShowModal}
                  setTitleModal={setTitleModal}
                  updatedTimeSheet={editTimeSheet}
                />
              </Row>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
