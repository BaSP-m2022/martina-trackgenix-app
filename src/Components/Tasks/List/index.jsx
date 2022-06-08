import React, { useState } from 'react';
import style from './list.module.css';
import Row from '../../Shared/Row/Row';
import EditTask from '../EditForm';

const List = ({ listTask, deleteItem, setShowModal, setShowTitle, editItem }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setShowTitle('Task deleted successfully');
      deleteItem(_id);
      closeForm();
    } catch (error) {
      setShowModal(true);
      setShowTitle(error.msg);
    }
  };

  const closeForm = () => {
    setShowFormEdit(false);
  };

  const openForm = () => {
    setShowFormEdit(true);
  };

  const newList = listTask.map((task) => {
    return {
      _id: task._id,
      description: task.description
    };
  });

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th id="id">Id</th>
            <th id="description">Description</th>
          </tr>
        </thead>
        <tbody>
          {newList.map((task) => (
            <Row
              key={task._id}
              data={task}
              headers={['_id', 'description']}
              deleteItem={() => handleDelete(task._id)}
              editItem={openForm}
            >
              <EditTask
                key={task._id}
                previewTask={task}
                show={showFormEdit}
                closeForm={closeForm}
                setShowModal={setShowModal}
                setShowTitle={setShowTitle}
                editItem={editItem}
              />
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
