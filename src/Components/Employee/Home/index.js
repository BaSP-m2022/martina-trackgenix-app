import styles from './home.module.css';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.container}>
      <div>{user && <h2>Welcome {user?.first_name + ' ' + user?.last_name}</h2>}</div>
    </section>
  );
}

export default Home;
