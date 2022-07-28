import React, { useEffect, useState } from 'react';
import styles from 'Components/Employee/TimeSheet/timesheets.module.css';
import { Loader, Button, Modal } from 'Components/Shared';
import Form from 'Components/Employee/TimeSheet/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from 'redux/timeSheets/thunks';
import {
  endOfWeekWithOptions,
  startOfWeekWithOptions,
  format,
  add,
  sub,
  eachDayOfInterval
} from 'date-fns/esm/fp';
import { isBefore } from 'date-fns';
import { getProjects } from 'redux/projects/thunks';

const TimeSheet = () => {
  const isLoading = useSelector((state) => state.timeSheet.isLoading);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimeSheet());
    dispatch(getProjects());
    getCurrentWeek(todayDate);
  }, []);

  const timesheetsList = useSelector((state) => state.timeSheet.list);
  const listProjects = useSelector((state) => state.projects.list);

  const todayDate = new Date();
  const [startWeekDay, setStartWeekDay] = useState();
  const [endWeekDay, setEndWeekDay] = useState();
  const [week, setWeek] = useState({});
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [listData, setListData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousTimeSheet, setPreviousTimeSheet] = useState({
    _id: '',
    employee: user._id,
    hs_worked: 0,
    task: '',
    project: '',
    timesheetDate: ''
  });

  const filteredListTimeSheet = timesheetsList.filter(
    (timeSheet) => timeSheet.employee?._id == user?._id
  );

  const listProjectEmployee = listProjects.filter((projects) => {
    return projects.employees.find((employee) => employee.id._id == user._id);
  });

  useEffect(() => {
    formatListData(listProjectEmployee || [], filteredListTimeSheet, daysOfWeek);
  }, [timesheetsList, week]);

  const formatListData = (projects, filteredTimesheets, daysOfWeek) => {
    const formatedWeek = formatDaysOfWeek(daysOfWeek);
    let hoursForeachProject = [];
    const dataList = projects.map((project) => {
      const weekTimesheets = getWeekTimesheets(filteredTimesheets, project, formatedWeek);
      const totalHours = weekTotalHours(weekTimesheets.workedHours);
      hoursForeachProject.push(totalHours);
      return {
        id: project._id,
        projectName: project.project_name,
        monday: {
          workedHours: weekTimesheets.workedHours[0],
          id: weekTimesheets.timesheets[0],
          task: weekTimesheets.task[0]
        },
        tuesday: {
          workedHours: weekTimesheets.workedHours[1],
          id: weekTimesheets.timesheets[1],
          task: weekTimesheets.task[1]
        },
        wednesday: {
          workedHours: weekTimesheets.workedHours[2],
          id: weekTimesheets.timesheets[2],
          task: weekTimesheets.task[2]
        },
        thursday: {
          workedHours: weekTimesheets.workedHours[3],
          id: weekTimesheets.timesheets[3],
          task: weekTimesheets.task[3]
        },
        friday: {
          workedHours: weekTimesheets.workedHours[4],
          id: weekTimesheets.timesheets[4],
          task: weekTimesheets.task[4]
        },
        saturday: {
          workedHours: weekTimesheets.workedHours[5],
          id: weekTimesheets.timesheets[5],
          task: weekTimesheets.task[5]
        },
        sunday: {
          workedHours: weekTimesheets.workedHours[6],
          id: weekTimesheets.timesheets[6],
          task: weekTimesheets.task[6]
        },
        totalHours: totalHours
      };
    });
    setListData(dataList);
    setTotalHours(weekTotalHours(hoursForeachProject));
  };

  const getWeekTimesheets = (filteredTimesheets, project, formatedWeek) => {
    let weekTimesheetsWorkedHours = [0, 0, 0, 0, 0, 0, 0];
    let weekTimesheetsId = [null, null, null, null, null, null, null];
    let weekTimesheetsTasks = ['', '', '', '', '', '', ''];
    filteredTimesheets.forEach((timesheet) => {
      if (timesheet.project?._id === project._id) {
        const timesheetDate = format('dd/MM/yyyy', new Date(timesheet.timesheetDate));
        for (let i = 0; i < formatedWeek.length; i++) {
          if (timesheetDate === formatedWeek[i]) {
            weekTimesheetsWorkedHours[i] = timesheet?.hs_worked;
            weekTimesheetsId[i] = timesheet?._id;
            weekTimesheetsTasks[i] = timesheet.task?._id;
          }
        }
      }
    });
    return {
      workedHours: weekTimesheetsWorkedHours,
      timesheets: weekTimesheetsId,
      task: weekTimesheetsTasks
    };
  };

  const weekTotalHours = (weekTimesheets) => {
    const initialValue = 0;
    const sumWithInitial = weekTimesheets.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
  };

  const nextWeek = (start, end) => {
    const newStartDate = add({ days: 7 }, start);
    const newEndDate = add({ days: 7 }, end);
    setStartWeekDay(newStartDate);
    setEndWeekDay(newEndDate);
    setDaysOfWeek(eachDayOfInterval({ start: newStartDate, end: newEndDate }));
    const formatedStart = format('dd/MM/yyyy', newStartDate);
    const formatedEnd = format('dd/MM/yyyy', newEndDate);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const prevWeek = (start, end) => {
    const newStartDate = sub({ days: 7 }, start);
    const newEndDate = sub({ days: 7 }, end);
    setStartWeekDay(newStartDate);
    setEndWeekDay(newEndDate);
    setDaysOfWeek(eachDayOfInterval({ start: newStartDate, end: newEndDate }));
    const formatedStart = format('dd/MM/yyyy', newStartDate);
    const formatedEnd = format('dd/MM/yyyy', newEndDate);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const formatDaysOfWeek = (days) => {
    const formatedWeek = days.map((date) => {
      return format('dd/MM/yyyy', date);
    });
    return formatedWeek;
  };

  const getCurrentWeek = (todayDate) => {
    const startOfWeek = startOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    const endOfWeek = endOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    setStartWeekDay(startOfWeek);
    setEndWeekDay(endOfWeek);
    setDaysOfWeek(eachDayOfInterval({ start: startOfWeek, end: endOfWeek }));
    const formateStart = format('dd/MM/yyyy', startOfWeek);
    const formateEnd = format('dd/MM/yyyy', endOfWeek);
    setWeek({
      startDate: formateStart,
      endDate: formateEnd
    });
  };

  const headers = [
    { header: 'Project Name', key: 'projectName', style: false },
    { header: 'Monday', key: 'monday', style: true, date: daysOfWeek[0] },
    { header: 'Tuesday', key: 'tuesday', style: true, date: daysOfWeek[1] },
    { header: 'Wednesday', key: 'wednesday', style: true, date: daysOfWeek[2] },
    { header: 'Thursday', key: 'thursday', style: true, date: daysOfWeek[3] },
    { header: 'Friday', key: 'friday', style: true, date: daysOfWeek[4] },
    { header: 'Saturday', key: 'saturday', style: true, date: daysOfWeek[5] },
    { header: 'Sunday', key: 'sunday', style: true, date: daysOfWeek[6] },
    { header: 'Total Hours', key: 'totalHours', style: false }
  ];

  const editItem = (timeSheet, header) => {
    setPreviousTimeSheet({
      _id: timeSheet[header.key].id,
      employee: user?._id,
      hs_worked: timeSheet[header.key].workedHours,
      task: timeSheet[header.key].task,
      project: timeSheet.id,
      timesheetDate: format('yyyy-MM-dd', header.date)
    });
    setShowForm(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <h2>Worked Hours</h2>
          <div className={styles.topContainer}>
            <Button
              width={'80px'}
              height={'50px'}
              onClick={() => prevWeek(startWeekDay, endWeekDay)}
            >
              {'<'}
            </Button>
            <p className={styles.weekText}>
              {week?.startDate} - {week?.endDate}
            </p>
            <Button
              width={'80px'}
              height={'50px'}
              onClick={() => nextWeek(startWeekDay, endWeekDay)}
            >
              {'>'}
            </Button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                {headers.map((header, index) => {
                  return (
                    <th key={index} className={styles.th}>
                      {header.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listData.map((row) => {
                return (
                  <tr key={row.id} className={styles.rows}>
                    {headers.map((header, index) => {
                      return (
                        <td
                          key={index}
                          className={header.style ? styles.timesheetTd : styles.td}
                          onClick={() => {
                            if (header.style && isBefore(header.date, todayDate)) {
                              editItem(row, header);
                            } else {
                              setShowModal(true);
                              setChildrenModal('This day is not available');
                            }
                          }}
                        >
                          {header.style ? row[header.key].workedHours : row[header.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2 className={styles.totalText}>Total: {totalHours}</h2>
          <Form
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previousTimeSheet={previousTimeSheet}
            setPreviousTimeSheet={setPreviousTimeSheet}
          />
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
    </>
  );
};

export default TimeSheet;
