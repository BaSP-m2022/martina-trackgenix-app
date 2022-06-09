import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import FormTasks from './Form/Form';
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
  const [previewTask, setPreviewTask] = useState({
    _id: '',
    description: ''
  });
  const [method, setMethod] = useState('');

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

  const deleteItem = (_id) => {
    saveTasks([...tasks.filter((task) => task._id !== _id)]);
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

  const openForm = () => {
    setMethod('POST');
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
        deleteItem={deleteItem}
        listTask={tasks}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setShowForm={setShowForm}
        editItem={editItem}
        setLoading={setLoading}
        setPreviewTask={setPreviewTask}
        setMethod={setMethod}
      />
      <FormTasks
        addItem={addItem}
        editItem={editItem}
        showForm={showForm}
        setShowForm={setShowForm}
        closeForm={openForm}
        setShowModal={setShowModal}
        setShowTitle={setShowTitle}
        setLoading={setLoading}
        previewTask={previewTask}
        setPreviewTask={setPreviewTask}
        method={method}
      />
      <div>
        <Button onClick={openForm}>Create a new task</Button>
        <Modal handleClose={handleClose} isOpen={showModal} title={showTitle}>
          {showTitle}
        </Modal>
        <Loader show={loading} />
      </div>
    </section>
  );
}

export default Tasks;
