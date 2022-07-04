import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, useRouteMatch, Route } from 'react-router-dom';
// import PrivateRoute from 'Routes/PrivateRoute';
import Layout from 'Components/Shared/Layout';

const Home = lazy(() => import('Components/Employee/Home'));
const Profile = lazy(() => import('Components/Employee/Profile'));
const Projects = lazy(() => import('Components/Employee/Projects'));
const TimeSheets = lazy(() => import('Components/Employee/TimeSheet'));

const employeeRoutes = [
  { path: '/employee/profile', name: 'Profile' },
  { path: '/employee/projects', name: 'Projects' },
  { path: '/employee/timesheets', name: 'Time-sheets' }
];

const EmployeeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={employeeRoutes}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`${url}/`} component={Home} />
          <Route path={`${url}/projects`} component={Projects} />
          <Route path={`${url}/profile`} component={Profile} />
          <Route path={`${url}/timesheets`} component={TimeSheets} />
          <Redirect to={`${url}/`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default EmployeeRoutes;
