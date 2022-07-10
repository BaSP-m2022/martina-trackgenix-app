import React, { useState } from 'react';
import styles from './table.module.css';
import Row from 'Components/Shared/Row/Row';
import moment from 'moment';
// import Button from '../Buttons/Buttons';

const TimeSheetHs = ({ title, data }) => {
  // console.log('data', data);
  const [date, setDate] = useState('');
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

  data.map((item) => {
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
  });

  console.log('input', date);
  const setDatePicker = () => {
    data.find((item) => {
      if (moment(item.timesheetDate).format('yy-MM-DD') == date) {
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
    });
  };

  setDatePicker();
  console.log('dia pickeado', setWeek);
  // const initialWeek = data.find((item) => {
  //   if (item.timesheetDay == 'Monday') {
  //     return item.timesheetDate;
  //   }
  // });
  // console.log('initial', initialWeek);

  // const finalWeek = moment(initialWeek.timesheetDate).add(6, 'days').format('yyyy-MM-DD');
  // console.log('finalweek', finalWeek);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
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
        <input className={styles.inputD} type="date" disabled value={setWeek.sunday}></input>
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
          <Row
            data={hoursWeek}
            headers={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
          />
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetHs;
