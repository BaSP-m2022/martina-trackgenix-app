import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Shared/Layout';

const Home = lazy(() => import('Components/SuperAdmin/Home'));
const SuperAdmins = lazy(() => import('Components/SuperAdmin/SuperAdmins'));
const Admins = lazy(() => import('Components/SuperAdmin/Admins'));
const Employees = lazy(() => import('Components/SuperAdmin/Employees'));
const Tasks = lazy(() => import('Components/SuperAdmin/Tasks'));
const Projects = lazy(() => import('Components/SuperAdmin/Projects'));
const TimeSheets = lazy(() => import('Components/SuperAdmin/TimeSheets'));

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
    <Layout routes={adminRoutes}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`${url}/home`} component={Home} />
          <Route path={`${url}/super-admins`} component={SuperAdmins} />
          <Route path={`${url}/admins`} component={Admins} />
          <Route path={`${url}/employees`} component={Employees} />
          <Route path={`${url}/projects`} component={Projects} />
          <Route path={`${url}/time-sheets`} component={TimeSheets} />
          <Route path={`${url}/tasks`} component={Tasks} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AdminRoutes;
