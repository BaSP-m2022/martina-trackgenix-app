import styles from './tasks.module.css';
import List from './List';

function Tasks() {
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default Tasks;
