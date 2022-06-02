import React, { useEffect, useState } from 'react';
import style from './tasks.module.css';
import List from './List';

const Tasks = () => {
  const [listTask, setListTask] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then((response) => response.json())
      .then((response) => {
        setListTask(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE'
      }).then(() => {
        alert('succesfully delete');
      });
      setListTask(listTask.filter((task) => task._id !== id));
    }
  };
  return (
    <section className={style.container}>
      <List handleDelete={handleDelete} listTask={listTask} />
    </section>
  );
};

export default Tasks;
