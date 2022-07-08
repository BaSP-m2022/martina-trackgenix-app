// import React, { useState } from 'react';
import styles from './table.module.css';
import Row from 'Components/Shared/Row/Row';
// import Button from '../Buttons/Buttons';

const TimeSheetHs = ({ title, data }) => {
  console.log('data', data);
  const week = {
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
        week.monday = week.monday + item.hs_worked;
        break;
      case 'Tuesday':
        week.tuesday = week.tuesday + item.hs_worked;
        break;
      case 'Wednesday':
        week.wednesday = week.wednesday + item.hs_worked;
        break;
      case 'Thursday':
        week.thursday = week.thursday + item.hs_worked;
        break;
      case 'Friday':
        week.friday = week.friday + item.hs_worked;
        break;
      case 'Saturday':
        week.saturday = week.saturday + item.hs_worked;
        break;
      case 'Sunday':
        week.sunday = week.sunday + item.hs_worked;
        break;
      default:
        break;
    }
  });

  console.log('week', week);
  return (
    <div className={styles.container}>
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
            data={week}
            headers={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
          />
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetHs;
