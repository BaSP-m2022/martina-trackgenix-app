import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import AddForm from './AddForm/index';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeForm = () => {
    setShowForm(false);
  };

  const onClick = () => {
    setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <AddForm show={showForm} closeForm={closeForm} />
      <div>
        <h2>Tasks</h2>
        {tasks.map((task) => {
          return (
            <a key={task._id}>
              {task._id}
              {task.description}
            </a>
          );
        })}
        <button onClick={onClick}>Create a new task</button>
      </div>
    </section>
  );
}

export default Tasks;
