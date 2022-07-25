import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Loader } from 'Components/Shared';

const Home = lazy(() => import('Components/Admin/Home'));
const Employees = lazy(() => import('Components/Admin/Employees'));
const Projects = lazy(() => import('Components/Admin/Projects'));

const adminRoutes = [
  { path: '/admin/projects', name: 'Projects' },
  { path: '/admin/employees', name: 'Employees' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <Layout routes={adminRoutes} logout>
      <Suspense fallback={<Loader show={isLoading} />}>
        <Switch>
          <Route exact path={`${url}/home`} component={Home} />
          <Route path={`${url}/projects`} component={Projects} />
          <Route path={`${url}/employees`} component={Employees} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AdminRoutes;
