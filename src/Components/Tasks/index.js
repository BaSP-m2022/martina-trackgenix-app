import React, { useEffect, useState } from 'react';
import style from './tasks.module.css';
import List from './List';

const Tasks = () => {
  const [tasks, saveTasks] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      }).then(() => {
        alert('succesfully delete');
      });
      saveTasks(tasks.filter((task) => task._id !== id));
    }
  };
  return (
    <section className={style.container}>
      <List handleDelete={handleDelete} listTask={tasks} />
    </section>
  );
};

export default Tasks;
