import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';

const Home = lazy(() => import('Components/Home'));
const Header = lazy(() => import('Components/Shared/Header'));
const NavBar = lazy(() => import('Components/Shared/NavBar/NavBar'));
const Footer = lazy(() => import('Components/Shared/Footer'));
const Admins = lazy(() => import('Components/SuperAdmin/Admins'));
const SuperAdmins = lazy(() => import('Components/SuperAdmin/SuperAdmins'));
const Employees = lazy(() => import('Components/SuperAdmin/Employees'));
const Projects = lazy(() => import('Components/SuperAdmin/Projects'));
const TimeSheets = lazy(() => import('Components/SuperAdmin/TimeSheets'));
const Tasks = lazy(() => import('Components/SuperAdmin/Tasks'));

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default Layout;
