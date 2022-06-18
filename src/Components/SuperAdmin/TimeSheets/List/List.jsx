import React from 'react';
import styles from './list.module.css';
import Row from 'Components/Shared/Row/Row';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTimeSheet } from 'redux/timeSheets/thunks';

const List = ({ setShowForm, setPreviousTimeSheet, setShowModal, setChildrenModal }) => {
  const listTimeSheet = useSelector((state) => state.timeSheet.list);
  const dispatch = useDispatch();

  const handleEdit = (timesheet) => {
    setPreviousTimeSheet(timesheet);
    setShowForm(true);
  };

  const deleteItem = async (_id) => {
    if (confirm('Are you sure you want to delete this Time-Sheet')) {
      dispatch(deleteTimeSheet(_id));
      setShowModal(true);
      setChildrenModal('TimeSheet Deleted Successfully');
    }
  };

  const newList = listTimeSheet.map((item) => {
    return {
      _id: item._id,
      employee: item.employee ? item.employee.first_name : '',
      hs_worked: item.hs_worked,
      task: item.task ? item.task.description : '',
      project: item.project ? item.project.project_name : '',
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
                deleteItem={() => deleteItem(item._id)}
                editItem={() => handleEdit(item)}
              ></Row>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
