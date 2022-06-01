import React from 'react';

function Row(props) {
  const { task, deleteTask } = props;
  return (
    <tr id={task._id} className={StyleSheet.row}>
      <td>{task._id}</td>
      <td>{task.description}</td>
      <td>
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            deleteTask(task._id);
          }}
        ></i>
      </td>
      <td>
        <a href={`http://localhost:3000/task/${task._id}`}>
          <button>Edit</button>{' '}
        </a>
      </td>
    </tr>
  );
}
export default Row;
