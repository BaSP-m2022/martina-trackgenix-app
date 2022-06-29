import React, { Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home/Home';

// const Home = lazy(() => import('Components/Home'));

const homeRoutes = [
  { path: '/auth/login', name: 'Login' },
  { path: '/auth/sign-up', name: 'Sign Up' }
];

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  console.log(`${url}/`);
  return (
    <Layout routes={homeRoutes}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={`${url}/`} component={Home} />
          <Redirect to={`${url}/`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default HomeRoutes;
