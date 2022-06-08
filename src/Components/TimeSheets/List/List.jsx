import React, { useState } from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import EditTimeSheet from '../Edit/EditTimeSheet';
import Modal from '../../Shared/Modal/Modal';
import Button from '../../Shared/Buttons/Buttons';

const List = ({ list, setShowModal, setTitleModal, deleteItem, editTimeSheet, setLoading }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const handleDelete = async (_id) => {
    setLoading(true);

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setModalConfirm(false);
      setTitleModal('Time-sheet deleted successfully');
      deleteItem(_id);
      setLoading(false);
    } catch (error) {
      setShowModal(true);
      setModalConfirm(false);
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

  const newList = list.map((item) => {
    return {
      _id: item._id,
      employee: item.employee.first_name,
      hs_worked: item.hs_worked,
      task: item.task.description,
      project: item.project.project_name,
      timesheetDate: item.timesheetDate
    };
  });

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="_id">ID</th>
            <th id="employee">EMPLOYEE</th>
            <th id="hs_worked">HOURS WORKED</th>
            <th id="project">PROJECT</th>
            <th id="task">TASK</th>
            <th id="timesheetDate">DATE</th>
            <th id="edit">EDIT</th>
            <th id="delete">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {newList.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={['_id', 'employee', 'hs_worked', 'project', 'task', 'timesheetDate']}
                deleteItem={() => setModalConfirm(true)}
                editItem={() => setShowFormEdit(true)}
                openForm={openForm}
              >
                <Modal isOpen={modalConfirm} handleClose={() => setModalConfirm(false)}>
                  Are you sure you want to delete this Time-Sheet?
                  <div>
                    <Button onClick={() => handleDelete(item._id)}>Confirm</Button>
                  </div>
                  <div>
                    <Button onClick={() => setModalConfirm(false)}>Cancel</Button>
                  </div>
                </Modal>
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
