import React from 'react';
import Row from '../../Shared/Row/Row';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../../redux/tasks/thunks';

const List = ({ setShowForm, setPreviewTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(_id));
    }
  };

  const handleEdit = (task) => {
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
          {tasks.map((task) => (
            <Row
              key={task._id}
              data={task}
              headers={['_id', 'description']}
              deleteItem={() => handleDelete(task._id)}
              editItem={() => handleEdit(task)}
            ></Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
