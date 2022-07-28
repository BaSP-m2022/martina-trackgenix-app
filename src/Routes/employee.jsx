import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Redirect, useRouteMatch, Route } from 'react-router-dom';
import { Layout, Loader } from 'Components/Shared';

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
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <Layout routes={employeeRoutes} logout>
      <Suspense fallback={<Loader show={isLoading} />}>
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
