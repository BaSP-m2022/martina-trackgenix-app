import React from 'react';
import Row from '../../Shared/Row/Row';

const List = ({
  listTask,
  deleteItem,
  setShowModal,
  setShowTitle,
  setShowForm,
  setPreviewTask,
  setMethod,
  setLoading
}) => {
  const handleDelete = async (_id) => {
    setLoading(true);
    if (confirm('Are you sure you want to remove this task?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
          method: 'DELETE'
        });
        setShowModal(true);
        setShowTitle('Task deleted successfully');
        deleteItem(_id);
      } catch (error) {
        setShowModal(true);
        setShowTitle(error.msg);
        console.error(error);
      }
    }
    setLoading(false);
  };

  const handleEdit = (task) => {
    setMethod('PUT');
    setPreviewTask(task);
    setShowForm(true);
  };

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
          {listTask.map((task) => (
            <Row
              key={task._id}
              data={task}
              headers={['_id', 'description']}
              deleteItem={() => handleDelete(task._id)}
              setLoading={setLoading}
              editItem={() => handleEdit(task)}
            ></Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
