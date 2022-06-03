import React from 'react';

const Row = ({ task, deleteTask }) => {
  return (
    <tr id={task._id} className={StyleSheet.row}>
      <td>{task._id}</td>
      <td>{task.description}</td>
      <td>
        <a
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          <button>X</button>
        </a>
      </td>
    </tr>
  );
};
export default Row;
