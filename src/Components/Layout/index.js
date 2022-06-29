import React, { Suspense } from 'react';
import styles from './layout.module.css';
import Header from 'Components/Shared/Header';
import NavBar from 'Components/Shared/NavBar/NavBar';
import Footer from 'Components/Shared/Footer';

const Layout = ({ children, routes }) => {
  console.log('Layout routes:', routes);
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Header />
          <NavBar props={routes} />
        </div>
        {children}
        <Footer props={routes} />
      </Suspense>
    </div>
  );
};

export default Layout;
