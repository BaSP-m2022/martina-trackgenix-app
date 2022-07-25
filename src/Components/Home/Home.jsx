import React from 'react';
import styles from './home.module.css';
import logoTrack from 'Assets/Imgs/logoTrackgenix.png';

function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.container}>
        <h2> Welcome to</h2>
        <img className={styles.logoTrackgenix} src={logoTrack} />
      </div>
    </section>
  );
}

export default Home;
