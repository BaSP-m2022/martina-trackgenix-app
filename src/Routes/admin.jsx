import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Shared/Layout';

const Home = lazy(() => import('Components/Admin/Home'));
const SuperAdmins = lazy(() => import('Components/Admin/SuperAdmins'));
const Admins = lazy(() => import('Components/Admin/Admins'));
const Employees = lazy(() => import('Components/Admin/Employees'));
const Tasks = lazy(() => import('Components/Admin/Tasks'));
const Projects = lazy(() => import('Components/Admin/Projects'));
const TimeSheets = lazy(() => import('Components/Admin/TimeSheets'));

const adminRoutes = [
  { path: '/admin/admins', name: 'Admins' },
  { path: '/admin/super-admins', name: 'Super-admins' },
  { path: '/admin/employees', name: 'Employees' },
  { path: '/admin/projects', name: 'Projects' },
  { path: '/admin/time-sheets', name: 'Time-sheets' },
  { path: '/admin/tasks', name: 'Tasks' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminRoutes} logout>
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
