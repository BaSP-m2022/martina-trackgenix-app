import style from './tasks.module.css';
import List from './List';

function Tasks() {
  return (
    <section className={style.container}>
      <List />
    </section>
  );
}

export default Tasks;
