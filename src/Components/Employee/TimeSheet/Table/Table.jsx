import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './table.module.css';
// import Row from 'Components/Shared/Row/Row';
import moment from 'moment';
// import Button from '../Buttons/Buttons';
// setShowModal, setChildrenModal
const TimeSheetHs = ({ title, data, setShowForm }) => {
  console.log('data', data);
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');

  const listTimeSheet = useSelector((state) => state.timeSheet.list);
  const user = useSelector((state) => state.auth?.user);
  const listProjects = useSelector((state) => state.projects.list);

  const listProjectEmployee = listProjects.filter((projects) => {
    return projects.employees.find((employee) => employee.id == user._id);
  });

  const projectSelected = listProjects.filter((projects) => {
    return projects._id == project;
  });

  const listTimeSheetEmployee = listTimeSheet.filter((item) => {
    return item.employee._id == user._id;
  });
  console.log('timeSheet list store', listTimeSheetEmployee);
  console.log('project list store', listProjectEmployee);

  let setWeek = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  };

  const hoursWeek = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  };

  // const setDatePicker = () => {
  //   data.map((item) => {
  //     if (moment(item.timesheetDate).format('yy-MM-DD') == date) {
  //       loadHours();
  //       if (item.timesheetDay == 'Monday') {
  //         for (let index = 0; index < 7; index++) {
  //           week[index] = {
  //             day: moment(item.timesheetDate).add(index, 'days').format('yy-MM-DD'),
  //             hours: week[index].hours
  //           };
  //         }
  //       }
  //     }
  //     // else {
  //     //   setShowModal(true);
  //     //   setChildrenModal('Select a Monday');
  //     // }
  //     // }
  //   });
  // };

  console.log('input', date);
  const setDatePicker = () => {
    data.find((item) => {
      if (moment(item.timesheetDate).format('yy-MM-DD') == date) {
        loadHours();
        if (item.timesheetDay == 'Monday') {
          return (setWeek = [
            {
              monday: moment(item.timesheetDate).format('yy-MM-DD'),
              tuesday: moment(item.timesheetDate).add('1', 'days').format('yy-MM-DD'),
              wednesday: moment(item.timesheetDate).add('2', 'days').format('yy-MM-DD'),
              thursday: moment(item.timesheetDate).add('3', 'days').format('yy-MM-DD'),
              friday: moment(item.timesheetDate).add('4', 'days').format('yy-MM-DD'),
              saturday: moment(item.timesheetDate).add('5', 'days').format('yy-MM-DD'),
              sunday: moment(item.timesheetDate).add('6', 'days').format('yy-MM-DD')
            }
          ]);
        }
      }
    });
  };

  //   return (week = [
  //     {
  //       monday: moment(item.timesheetDate).format('yy-MM-DD'),
  //       tuesday: moment(item.timesheetDate).add('1', 'days').format('yy-MM-DD'),
  //       wednesday: moment(item.timesheetDate).add('2', 'days').format('yy-MM-DD'),
  //       thursday: moment(item.timesheetDate).add('3', 'days').format('yy-MM-DD'),
  //       friday: moment(item.timesheetDate).add('4', 'days').format('yy-MM-DD'),
  //       saturday: moment(item.timesheetDate).add('5', 'days').format('yy-MM-DD'),
  //       sunday: moment(item.timesheetDate).add('6', 'days').format('yy-MM-DD')
  //     }
  //   ]);
  // }
  const loadHours = () => {
    data.map((item) => {
      if (item.project == projectSelected[0]?.project_name) {
        switch (item.timesheetDay) {
          case 'Monday':
            hoursWeek.monday = hoursWeek.monday + item.hs_worked;
            break;
          case 'Tuesday':
            hoursWeek.tuesday = hoursWeek.tuesday + item.hs_worked;
            break;
          case 'Wednesday':
            hoursWeek.wednesday = hoursWeek.wednesday + item.hs_worked;
            break;
          case 'Thursday':
            hoursWeek.thursday = hoursWeek.thursday + item.hs_worked;
            break;
          case 'Friday':
            hoursWeek.friday = hoursWeek.friday + item.hs_worked;
            break;
          case 'Saturday':
            hoursWeek.saturday = hoursWeek.saturday + item.hs_worked;
            break;
          case 'Sunday':
            hoursWeek.sunday = hoursWeek.sunday + item.hs_worked;
            break;
          default:
            break;
        }
      }
    });
  };

  setDatePicker();
  console.log('data', data);
  // console.log('semana pickeado', week);
  console.log('proyecto seleccionado', projectSelected[0]?.project_name);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h2>Projects</h2>
        <select className={styles.input} onChange={(e) => setProject(e.target.value)}>
          {listProjectEmployee.map((item) => (
            <option key={item._id} value={item._id}>
              {item.project_name}
            </option>
          ))}
        </select>
        <label>Monday</label>
        <input
          className={styles.inputD}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </div>
      <div className={styles.container}>
        <label>Sunday</label>
        <input className={styles.inputD} type="date" disabled value={setWeek[0]?.sunday}></input>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th id="monday">MONDAY</th>
            <th id="tuesday">TUESDAY</th>
            <th id="wednesday">WEDNESDAY</th>
            <th id="thursday">THURSDAY</th>
            <th id="friday">FRIDAY</th>
            <th id="saturday">SATURDAY</th>
            <th id="sunday">SUNDAY</th>
          </tr>
        </thead>
        <tbody>
          {/* <Row
            data={hoursWeek}
            headers={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
          /> */}
          <tr className={styles.tr} key={hoursWeek._id}>
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(
              (header, index) => {
                return (
                  <td key={index} onClick={() => setShowForm(true)}>
                    {hoursWeek[header]}
                  </td>
                );
              }
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetHs;
