import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { Layout, Loader } from 'Components/Shared';
import Home from 'Components/Home/Home';

const homeRoutes = [
  { path: '/auth/login', name: 'Login' },
  { path: '/auth/sign-up', name: 'Sign Up' }
];

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <Layout routes={homeRoutes}>
      <Suspense fallback={<Loader show={isLoading} />}>
        <Switch>
          <Route path={`${url}/`} component={Home} />
          <Redirect to={`${url}/`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default HomeRoutes;
