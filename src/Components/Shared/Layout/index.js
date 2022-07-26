import React from 'react';
import { useSelector } from 'react-redux';
import styles from './layout.module.css';
import Header from 'Components/Shared/Header';
import NavBar from 'Components/Shared/NavBar/NavBar';
import Footer from 'Components/Shared/Footer';
import Loader from 'Components/Shared/Loader/Loader';

const Layout = (props) => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { routes, logout } = props;
  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <div className={styles.container}>
          <div>
            <Header />
            <NavBar routes={routes} logout={logout} />
          </div>
          {props.children}
          <Footer props={routes} />
        </div>
      )}
    </>
  );
};

export default Layout;
