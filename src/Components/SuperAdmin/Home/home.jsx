import styles from './home.module.css';
import { useSelector } from 'react-redux';
import fondoHome from 'Assets/Imgs/fondoHome.png';
import logoTrack from 'Assets/Imgs/logoTrackgenix.png';

function Home() {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.container}>
      <img className={styles.fondoHome} src={fondoHome} />
      <div className={styles.welcome}>
        <h2>Welcome</h2>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <img className={styles.logoTrack} src={logoTrack} />
      </div>
    </section>
  );
}

export default Home;
