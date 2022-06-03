import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Add from './AddForm/index';
import Modal from './Modals/index';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');

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

  const addItem = ({ _id, description }) => {
    const newItem = {
      _id,
      description
    };
    saveTasks([...tasks, newItem]);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const onClick = () => {
    setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <Add
        addItem={addItem}
        show={showForm}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
      />
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
        <Modal showTitle={showTitle} showModal={showModal} setShowModal={setShowModal} />
      </div>
    </section>
  );
}

export default Tasks;
