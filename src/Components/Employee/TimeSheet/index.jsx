import React, { useEffect } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from 'redux/timeSheets/thunks';

const timeSheet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeSheet());
  }, []);

  const listTimeSheet = useSelector((state) => state.timeSheet.list);
  const employeeId = '629d41966737e327d3189242';

  const filteredListTimeSheet = listTimeSheet.filter(
    (timeSheet) => timeSheet.employee._id == employeeId
  );

  const newList = filteredListTimeSheet.map((item) => {
    return {
      _id: item._id,
      employee: item.employee ? item.employee.first_name : '',
      hs_worked: item.hs_worked,
      task: item.task ? item.task.description : '',
      project: item.project ? item.project.project_name : '',
      timesheetDate: item.timesheetDate.slice(0, 10)
    };
  });

  return (
    <Table
      // title={`${newList ? newList[0].employee : ''} Time-Sheet`}
      title={'<Employee-Name> TimeSheet'}
      data={newList}
      headersColumns={['ID', 'Employee', 'Hours Worked', 'Project', 'Task', 'Date']}
      headers={['_id', 'employee', 'hs_worked', 'project', 'task', 'timesheetDate']}
    />
  );
};

export default timeSheet;
