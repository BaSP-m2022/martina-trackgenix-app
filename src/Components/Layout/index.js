import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'Components/Shared/Header/index';
import NavBar from 'Components/Shared/NavBar/NavBar';
import Footer from 'Components/Shared/Footer/index';
import Admins from 'Components/SuperAdmin/Admins/index';
import SuperAdmins from 'Components/SuperAdmin/SuperAdmins/index';
import Home from 'Components/Home/index';
import styles from './layout.module.css';
import Employees from 'Components/SuperAdmin/Employees/index';
import Projects from 'Components/SuperAdmin/Projects/index';
import TimeSheets from 'Components/SuperAdmin/TimeSheets/index';
import Tasks from 'Components/SuperAdmin/Tasks/index';

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
