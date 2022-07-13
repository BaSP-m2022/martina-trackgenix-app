import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { Layout, Loader } from 'Components/Shared';

const Home = lazy(() => import('Components/SuperAdmin/Home/home'));
const Admins = lazy(() => import('Components/SuperAdmin/Admins'));
const Employees = lazy(() => import('Components/SuperAdmin/Employees'));
const Projects = lazy(() => import('Components/SuperAdmin/Projects'));

const SuperadminRoutes = [
  { path: '/super-admin/admins', name: 'Admins' },
  { path: '/super-admin/employees', name: 'Employees' },
  { path: '/super-admin/projects', name: 'Projects' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <Layout routes={SuperadminRoutes} logout>
      <Suspense fallback={<Loader show={isLoading} />}>
        <Switch>
          <Route exact path={`${url}/home`} component={Home} />
          <Route path={`${url}/admins`} component={Admins} />
          <Route path={`${url}/employees`} component={Employees} />
          <Route path={`${url}/projects`} component={Projects} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AdminRoutes;
