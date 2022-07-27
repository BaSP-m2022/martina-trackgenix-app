import { Link, useHistory, withRouter, useRouteMatch } from 'react-router-dom';
import { Button } from '..';
import styles from './navBar.module.css';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/thunks';
import logoGreen from 'Assets/Imgs/logoGreen.png';

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
        <img className={styles.logoGreen} src={logoGreen} />
        <p className={styles.appName}>TrackGenix</p>
      </Link>
      <div className={styles.options}>
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
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
