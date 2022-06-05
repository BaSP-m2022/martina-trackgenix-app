import { Link } from 'react-router-dom';
import styles from './navBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles.homeContainer}>
        <p className={styles.appName}>TrackGENIX</p>
      </Link>
      <ul className={styles.rutes}>
        <li>
          <Link to="/admins">Admins</Link>
        </li>
        <li>
          <Link to="/super-admins">Super Admins</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/time-sheets">Timesheets</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
