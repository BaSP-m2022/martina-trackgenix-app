import React, { useEffect } from 'react';
import Table from 'Components/Shared/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from 'redux/timeSheets/thunks';
import { getEmployees } from 'redux/employees/thunks';

const timeSheet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeSheet());
    dispatch(getEmployees());
  }, []);

  let listTimeSheet = useSelector((state) => state.timeSheet.list);
  const employeeId = '629d41966737e327d3189242';

  // const employee = useSelector((state) => state.employees.list).find(
  //   (employee) => employee._id === '629d41966737e327d3189242'
  // );
  // console.log('Employee: ', employee);

  console.log('List 1: ', listTimeSheet);

  listTimeSheet = listTimeSheet.filter((timeSheet) => timeSheet.employee._id == employeeId);
  console.log('List 2: ', listTimeSheet);

  return (
    <Table
      // title={`${employee.first_name} ${employee.last_name} Time-Sheet`}
      title={'<Employee-Name> TimeSheet'}
      data={listTimeSheet}
      headersColumns={['ID', 'Employee', 'Hours Worked', 'Project', 'Task', 'Date']}
      headers={['_id', 'employee', 'hs_worked', 'project', 'task', 'timesheetDate']}
    />
  );
};

export default timeSheet;
