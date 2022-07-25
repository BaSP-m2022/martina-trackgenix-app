import styles from './home.module.css';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <section className={styles.container}>
      <div className={styles.container}>
        {user && <h2>Welcome {user?.firstName + ' ' + user?.lastName}</h2>}
      </div>
    </section>
  );
}

export default Home;
