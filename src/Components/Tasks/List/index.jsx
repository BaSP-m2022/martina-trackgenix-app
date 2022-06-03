import React from 'react';
import style from '../tasks.module.css';
import Row from '../row';

const List = ({ listTask, handleDelete }) => {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th> Id </th> <th> Description </th>
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
