import { Link, withRouter } from 'react-router-dom';
import styles from './navBar.module.css';

const NavBar = ({ props }) => {
  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles.homeContainer}>
        <p className={styles.appName}>TrackGENIX</p>
      </Link>
      <ul className={styles.rutes}>
        {props.map((route) => {
          return (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
