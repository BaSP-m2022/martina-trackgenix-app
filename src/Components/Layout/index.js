import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../Header/index';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';

function Layout() {
  const arrayRoute = [
    { path: '/admins', name: 'Admins' },
    { path: '/super-admins', name: 'Super-admins' },
    { path: '/employees', name: 'Employees' },
    { path: '/projects', name: 'Projects' },
    { path: '/time-sheets', name: 'Time-sheets' },
    { path: '/tasks', name: 'Tasks' }
  ];
  return (
    <div className={styles.container}>
      <Header />
      <NavBar props={arrayRoute} />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/admins" component={Admins} />
        <Route path="/super-admins" component={SuperAdmins} />
        <Route path="/employees" component={Employees} />
        <Route path="/projects" component={Projects} />
        <Route path="/time-sheets" component={TimeSheets} />
        <Route path="/tasks" component={Tasks} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer props={arrayRoute} />
    </div>
  );
}

export default Layout;
