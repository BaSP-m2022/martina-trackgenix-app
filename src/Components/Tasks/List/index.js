import React from 'react';
import style from '../tasks.module.css';
import Row from '../row';

const List = (props) => {
  const { listTask, handleDelete } = props;
  return (
    <div className={style.container}>
      <a href="http://localhost:3000/tasks">
        <button>Add/Edit</button>
      </a>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
          </tr>
        </thead>
        {listTask.map((task) => (
          <Row key={task.id} task={task} deleteTask={handleDelete} />
        ))}
      </table>
    </div>
  );
};
export default List;
