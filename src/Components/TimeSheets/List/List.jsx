import React from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTimeSheetSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending
} from '../../../redux/timeSheets/actions';

const List = ({ setShowModal, setShowForm, setMethod, setChildrenModal, setPreviousTimeSheet }) => {
  const listTimeSheet = useSelector((state) => state.timeSheet.list);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    deleteTimeSheetPending();
    if (confirm('Are you sure you want to delete this Time-Sheet?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
          method: 'DELETE'
        });
        setShowModal(true);
        setChildrenModal('Time-sheet deleted successfully');
        dispatch(deleteTimeSheetSuccess(_id));
      } catch (error) {
        setShowModal(true);
        setChildrenModal(error.msg);
        console.error(error);
        dispatch(deleteTimeSheetError(error.msg));
      }
    }
  };

  const handleEdit = (timesheet) => {
    setPreviousTimeSheet(timesheet);
    setMethod('PUT');
    setShowForm(true);
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
                deleteItem={() => handleDelete(item._id)}
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
