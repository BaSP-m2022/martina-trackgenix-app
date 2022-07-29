import styles from './home.module.css';
import { useSelector } from 'react-redux';
import fondoHome from 'Assets/Imgs/fondoHome.png';
import logoTrack from 'Assets/Imgs/logoTrackgenix.png';

function Home() {
  const user = useSelector((state) => state.auth.user);
  const employeeList = useSelector((state) => state.employees.list);

  const employeeFound = employeeList.find((item) => item?._id === user?._id);
  return (
    <section className={styles.container}>
      <img className={styles.fondoHome} src={fondoHome} />
      <div className={styles.wellcome}>
        <h2>Welcome</h2>
        {employeeFound && <h2>{employeeFound?.first_name + ' ' + employeeFound?.last_name}</h2>}
        <img className={styles.logoTrack} src={logoTrack} />
      </div>
    </section>
  );
}

export default Home;
