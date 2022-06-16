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
  const [childrenModal, setChildrenModal] = useState('');
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

  return isLoading ? (
    <Loader show={isLoading} />
  ) : (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List
        setShowForm={setShowForm}
        setPreviewTask={setPreviewTask}
        setChildrenModal={setChildrenModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <FormTasks
        showForm={showForm}
        setShowForm={setShowForm}
        previewTask={previewTask}
        setPreviewTask={setPreviewTask}
        setChildrenModal={setChildrenModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div>
        <Button onClick={openForm}>Create a new task</Button>
        <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
          {childrenModal}
        </Modal>
      </div>
    </section>
  );
};

export default Tasks;
