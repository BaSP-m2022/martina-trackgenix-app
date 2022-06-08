import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Add from './AddForm/index';
import List from './List';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';
import Modal from '../Shared/Modal/Modal';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
      setLoading(false);
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

  const addItem = ({ _id, description }) => {
    const newItem = {
      _id,
      description
    };
    saveTasks([...tasks, newItem]);
  };

  const editItem = (data) => {
    const taskUpdated = tasks.map((task) => {
      if (task._id === data._id) {
        return data;
      } else {
        return task;
      }
    });
    saveTasks(taskUpdated);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const onClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return loading ? (
    <Loader show={true} />
  ) : (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List
        handleDelete={handleDelete}
        listTask={tasks}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        editItem={editItem}
        setLoading={setLoading}
      />
      <Add
        addItem={addItem}
        show={showForm}
        closeForm={closeForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setLoading={setLoading}
      />
      <div>
        <Button onClick={onClick}>Create a new task</Button>
        <Modal handleClose={handleClose} isOpen={showModal} title={showTitle}>
          {showTitle}
        </Modal>
        <Loader show={loading} />
      </div>
    </section>
  );
}

export default Tasks;
