import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = ({ props }) => {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <ul className={styles.rutes}>
          {props.map((route) => {
            return (
              <li key={route.name}>
                <Link to={route.path}>{route.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © 2021 Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
