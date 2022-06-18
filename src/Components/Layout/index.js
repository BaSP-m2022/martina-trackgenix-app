import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
// import NavBar from 'Components/Shared/NavBar/NavBar';
import Header from 'Components/Shared/Header';
import SuperAdminLayout from 'Components/SuperAdmin/index';

const Home = lazy(() => import('Components/Home'));
const Employee = lazy(() => import('Components/Employee'));
const registerEmployee = lazy(() => import('Components/Employee/Sign-up'));

function Layout() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/super-admin" component={SuperAdminLayout} />
          <Route path="/employee" component={Employee} />
          <Route path="/employee/sign-up" component={registerEmployee} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Layout;
