import { useEffect, useState } from 'react';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <div>
        {tasks.map((task) => {
          return (
            <a key={task._id}>
              {task._id}
              {task.description}
            </a>
          );
        })}
        <a href="/tasks/form">
          <button type="button">Create a new task</button>
        </a>
      </div>
    </section>
  );
}

export default Tasks;
