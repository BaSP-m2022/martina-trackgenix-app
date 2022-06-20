import React, { useEffect, useState } from 'react';
import styles from 'Components/SuperAdmin/Tasks/tasks.module.css';
import FormTasks from 'Components/SuperAdmin/Tasks/Form/Form';
import List from 'Components/SuperAdmin/Tasks/List';
import Loader from 'Components/Shared/Loader/Loader';
import Button from 'Components/Shared/Buttons/Buttons';
import Modal from 'Components/Shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from 'redux/tasks/thunks';

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
