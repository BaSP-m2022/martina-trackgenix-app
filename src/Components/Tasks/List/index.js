import style from '../tasks.module.css';
import { useEffect, useState } from 'react';
import Row from '../row';
import Btn from './Button';

function List() {
  const [listTask, setListTask] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then((response) => response.json())
      .then((response) => {
        setListTask(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE'
      }).then(() => {
        alert('succesfully delete');
      });
      setListTask(listTask.filter((task) => task._id !== id));
    }
  };
  return (
    <div className={style.container}>
      <a href="http://localhost:3000/tasks">
        <Btn color="green" text="add/edit" />
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
}
export default List;
