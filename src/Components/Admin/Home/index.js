import { useEffect, useState } from 'react';
import styles from './home.module.css';
import firebaseApp from 'helper/firebase/index';

function Home() {
  const [currentAdmin, setCurrentAdmin] = useState();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((admin) => {
      setCurrentAdmin(admin);
    });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.container}>
        {currentAdmin && <h2>Welcome {currentAdmin.displayName}</h2>}
        {/* I'm trying to show the logged admin name, the code works but
         currentAdmin.displayName is null, however other data like email for
         example can be shown (try currentAdmin.email). Maybe we need to add
         admins names to firebase.*/}
      </div>
    </section>
  );
}

export default Home;
