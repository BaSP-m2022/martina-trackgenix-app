import React, { useEffect, useState } from 'react';
import styles from 'Components/Employee/Projects/Tasks/tasks.module.css';
import FormTasks from 'Components/Employee/Projects/Tasks/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks } from 'redux/tasks/thunks';
import { Table, Button, Loader } from 'Components/Shared';

const Tasks = ({ showTaskList, setShowTaskList, setShowModal, setTitleModal }) => {
  if (!showTaskList) {
    return null;
  }
  const [showForm, setShowForm] = useState(false);
  const [previewTask, setPreviewTask] = useState({
    _id: '',
    description: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const isLoading = useSelector((state) => state.tasks.isLoading);
  const listTasks = useSelector((state) => state.tasks.list);

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(_id));
    }
  };

  const handleEdit = (task) => {
    setPreviewTask(task);
    setShowForm(true);
  };

  return isLoading ? (
    <Loader show={isLoading} />
  ) : (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <div className={styles.btnX} onClick={() => setShowTaskList(false)}>
          X
        </div>
        <Table
          title={`Tasks`}
          data={listTasks}
          headersColumns={['Description', '', '']}
          headers={['description']}
          deleteItem={handleDelete}
          editItem={handleEdit}
        />
        <FormTasks
          showForm={showForm}
          setShowForm={setShowForm}
          previewTask={previewTask}
          setPreviewTask={setPreviewTask}
          setChildrenModal={setTitleModal}
          setShowModal={setShowModal}
        />
        <div>
          <Button onClick={() => setShowForm(true)}>Add new Task</Button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
