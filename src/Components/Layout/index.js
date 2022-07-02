import React from 'react';
import { useSelector } from 'react-redux';
import styles from './layout.module.css';
import Header from 'Components/Shared/Header';
import NavBar from 'Components/Shared/NavBar/NavBar';
import Footer from 'Components/Shared/Footer';
import Loader from 'Components/Shared/Loader/Loader';

const Layout = ({ children, routes }) => {
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <div className={styles.container}>
          <div>
            <Header />
            <NavBar props={routes} />
          </div>
          {children}
          <Footer props={routes} />
        </div>
      )}
      ;
    </>
  );
};

export default Layout;
