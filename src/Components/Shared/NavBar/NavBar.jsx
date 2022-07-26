import { Link, useHistory, withRouter, useRouteMatch } from 'react-router-dom';
import { Button } from '..';
import styles from './navBar.module.css';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/thunks';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = async () => {
    const resp = await dispatch(logOut());
    if (!resp.error) {
      alert(resp.message);
      history.push('/home');
    }
  };
  const { url } = useRouteMatch();
  return (
    <nav className={styles.navbar}>
      <Link to={`${url}/home`} className={styles.homeContainer}>
        <p className={styles.appName}>TrackGENIX</p>
      </Link>
      <ul className={styles.rutes}>
        {props.routes.map((route) => {
          return (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
      {props.logout && (
        <Button width={'100px'} height={'25px'} onClick={onClick}>
          Log Out
        </Button>
      )}
    </nav>
  );
};

export default withRouter(NavBar);
