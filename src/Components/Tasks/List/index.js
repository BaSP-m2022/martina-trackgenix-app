import { useEffect, useState } from 'react';
import style from '../tasks.module.css';

function list() {
  const [tasks, saveTask] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:3000/task`);
      const data = await response.json();
      saveTask(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <ul key={task._id}>
                <li>{task.employeeId}</li>
                <li>{task.description}</li>
              </ul>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default list;
