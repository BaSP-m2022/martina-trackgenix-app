import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from 'Components/SuperAdmin/superAdmin.module.css';
import NavBar from 'Components/Shared/NavBar/NavBar';
import Footer from 'Components/Shared/Footer';

const Home = lazy(() => import('Components/SuperAdmin/Home/index'));
const Admins = lazy(() => import('Components/SuperAdmin/Admins'));
const SuperAdmins = lazy(() => import('Components/SuperAdmin/SuperAdmins'));
const Employees = lazy(() => import('Components/SuperAdmin/Employees'));
const Projects = lazy(() => import('Components/SuperAdmin/Projects'));
const TimeSheets = lazy(() => import('Components/SuperAdmin/TimeSheets'));
const Tasks = lazy(() => import('Components/SuperAdmin/Tasks'));

function SuperAdminLayout() {
  const arrayRoute = [
    { path: '/super-admin/admins', name: 'Admins' },
    { path: '/super-admin/super-admins', name: 'Super-admins' },
    { path: '/super-admin/employees', name: 'Employees' },
    { path: '/super-admin/projects', name: 'Projects' },
    { path: '/super-admin/time-sheets', name: 'Time-sheets' },
    { path: '/super-admin/tasks', name: 'Tasks' }
  ];
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar props={arrayRoute} />
        <Switch>
          <Route path="/super-admin/home" component={Home} />
          <Route path="/super-admin/admins" component={Admins} />
          <Route path="/super-admin/super-admins" component={SuperAdmins} />
          <Route path="/super-admin/employees" component={Employees} />
          <Route path="/super-admin/projects" component={Projects} />
          <Route path="/super-admin/time-sheets" component={TimeSheets} />
          <Route path="/super-admin/tasks" component={Tasks} />
          <Route exact path="/super-admin/">
            <Redirect to="/super-admin/home" />
          </Route>
        </Switch>
        <Footer props={arrayRoute} />
      </Suspense>
    </div>
  );
}

export default SuperAdminLayout;
