import React from 'react';
import styles from './list.module.css';
import Table from '../../Shared/Table/Table';

const List = ({
  list,
  setShowModal,
  setShowForm,
  setMethod,
  deleteItem,
  setLoading,
  setChildrenModal,
  setPreviewTimeSheet
}) => {
  const handleDelete = async (_id) => {
    setLoading(true);
    if (confirm('Are you sure you want to delete this Time-Sheet?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
          method: 'DELETE'
        });
        setShowModal(true);
        setChildrenModal('Time-sheet deleted successfully');
        deleteItem(_id);
      } catch (error) {
        setShowModal(true);
        setChildrenModal(error.msg);
        console.error(error);
      }
    }
    setLoading(false);
  };

  const handleEdit = (timesheet) => {
    setPreviewTimeSheet(timesheet);
    setMethod('PUT');
    setShowForm(true);
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
      <Table
        title={'TimeSheets'}
        data={newList}
        headersColumns={[
          'ID',
          'Employee',
          'Worked Hours',
          'Projects',
          'Tasks',
          'Date',
          'Edit',
          'Delete'
        ]}
        headers={['_id', 'employee', 'hs_worked', 'project', 'task', 'timesheetDate']}
        deleteItem={handleDelete}
        editItem={handleEdit}
      ></Table>
    </section>
  );
};

export default List;
