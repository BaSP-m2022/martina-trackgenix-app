import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import FormTasks from './Form/Form';
import List from './List';
import Loader from '../Shared/Loader/Loader';
import Button from '../Shared/Buttons/Buttons';
import Modal from '../Shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/tasks/thunks';

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewTask, setPreviewTask] = useState({
    _id: '',
    description: ''
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.tasks.isLoading);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const openForm = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return isLoading ? (
    <Loader show={isLoading} />
  ) : (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List setShowModal={setShowModal} setShowForm={setShowForm} setPreviewTask={setPreviewTask} />
      <FormTasks
        showForm={showForm}
        setShowForm={setShowForm}
        previewTask={previewTask}
        setPreviewTask={setPreviewTask}
      />
      <div>
        <Button onClick={openForm}>Create a new task</Button>
        <Modal handleClose={handleClose} isOpen={showModal} />
      </div>
    </section>
  );
};

export default Tasks;
