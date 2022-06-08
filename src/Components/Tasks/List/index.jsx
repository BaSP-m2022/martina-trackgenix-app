import React, { useState } from 'react';
import Row from '../../Shared/Row/Row';
import EditTask from '../EditForm';

const List = ({ listTask, deleteItem, setShowModal, setShowTitle, editItem, setLoading }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setShowTitle('Task deleted successfully');
      deleteItem(_id);
      closeForm();
      setLoading(false);
    } catch (error) {
      setShowModal(true);
      setShowTitle(error.msg);
      setLoading(false);
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
    <div>
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
              setLoading={setLoading}
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
                setLoading={setLoading}
              />
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
