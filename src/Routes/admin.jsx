import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import PrivateRoute from 'Routes/PrivateRoute';
import Layout from 'Components/Layout';

const SuperAdmins = lazy(() => import('Components/SuperAdmin/SuperAdmins'));
const Admins = lazy(() => import('Components/SuperAdmin/Admins'));
const Employees = lazy(() => import('Components/SuperAdmin/Employees'));
const Tasks = lazy(() => import('Components/SuperAdmin/Tasks'));
const Projects = lazy(() => import('Components/SuperAdmin/Projects'));
const TimeSheets = lazy(() => import('Components/SuperAdmin/TimeSheet'));

const adminRoutes = [
  { path: '/super-admin/admins', name: 'Admins' },
  { path: '/super-admin/super-admins', name: 'Super-admins' },
  { path: '/super-admin/employees', name: 'Employees' },
  { path: '/super-admin/projects', name: 'Projects' },
  { path: '/super-admin/time-sheets', name: 'Time-sheets' },
  { path: '/super-admin/tasks', name: 'Tasks' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();

  console.log('Admin routes:', AdminRoutes);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout routes={adminRoutes}>
        <Switch>
          <PrivateRoute path={`${url}/super-admins`} component={SuperAdmins} />
          <PrivateRoute path={`${url}/admins`} component={Admins} />
          <PrivateRoute path={`${url}/employees`} component={Employees} />
          <PrivateRoute path={`${url}/projects`} component={Projects} />
          <PrivateRoute path={`${url}/time-sheets`} component={TimeSheets} />
          <PrivateRoute path={`${url}/tasks`} component={Tasks} />
          <Redirect to={`${url}/admins`} />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default AdminRoutes;
