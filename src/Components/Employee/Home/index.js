import styles from './home.module.css';
import { useSelector } from 'react-redux';
import fondoHome from 'Assets/Imgs/fondoHome.png';
import logoTrack from 'Assets/Imgs/logoTrackgenix.png';

function Home() {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.container}>
      <img className={styles.fondoHome} src={fondoHome} />
      <div className={styles.wellcome}>
        <h2>Wellcome</h2>
        {user && <h2>{user?.first_name + ' ' + user?.last_name}</h2>}
        <img className={styles.logoTrack} src={logoTrack} />
      </div>
    </section>
  );
}

export default Home;
