import React from 'react';
import styles from './loader.module.css';

const Loader = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.loaderShade}>
      <div className={styles.preloaderContainer}>
        <div className={styles.preloader}></div>;
      </div>
    </div>
  );
};

export default Loader;
