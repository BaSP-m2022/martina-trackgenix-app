import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.container}>
        <h2>Home</h2>
        <Link to="/employee" className={styles.homeContainer}>
          <h2>Employee</h2>
        </Link>
        <Link to="/super-admin" className={styles.homeContainer}>
          <h2>Super Admin</h2>
        </Link>
        <Link to="/employee/sign-up" className={styles.homeContainer}>
          <h2>Register</h2>
        </Link>
      </div>
    </section>
  );
}

export default Home;
