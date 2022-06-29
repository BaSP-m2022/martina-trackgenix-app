import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import PrivateRoute from 'Routes/PrivateRoute';
import Layout from 'Components/Layout';

const Home = lazy(() => import('Components/Employee/Home'));
const Profile = lazy(() => import('Components/Employee/Profile'));
const Projects = lazy(() => import('Components/Employee/Projects'));
const TimeSheets = lazy(() => import('Components/Employee/TimeSheet'));

const employeeRoutes = [
  { path: '/employee/profile', name: 'Profile' },
  { path: '/employee/projects', name: 'Projects' },
  { path: '/employee/time-sheets', name: 'Time-sheets' }
];

const EmployeeRoutes = () => {
  const { url } = useRouteMatch();

  return (
    <Layout routes={employeeRoutes}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PrivateRoute path={`${url}/home`} component={Home} />
          <PrivateRoute path={`${url}/profile`} component={Profile} />
          <PrivateRoute path={`${url}/projects`} component={Projects} />
          <PrivateRoute path={`${url}/timesheets`} component={TimeSheets} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default EmployeeRoutes;
