import React from 'react';
import style from './list.module.css';
import Row from '../row';

const List = ({ listTask, handleDelete, setShowModal, setShowTitle, editItem }) => {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <th>Id</th>
          <th>Description</th>
          <th>Delete</th>
          <th>Edit</th>
        </thead>
        <tbody>
          {listTask.map((task) => (
            <Row
              key={task._id}
              task={task}
              deleteTask={handleDelete}
              setShowModal={setShowModal}
              setShowTitle={setShowTitle}
              editItem={editItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default List;
