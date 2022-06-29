import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import NotAllowed from 'Components/Auth/NotAllowed';
// import SignUp from 'Components/Auth/SignUp';

// const Login = lazy(() => import('Components/Auth/Login'));

const SignUp = lazy(() => import('Components/Auth/SignUp/index'));

// const NotAllowed = lazy(() => import('Components/Auth/NotAllowed/index'));

const authRoutes = [
  { path: '/auth/login', name: 'Login' },
  { path: '/auth/sign-up', name: 'Sign Up' },
  { path: '/auth/logout', name: 'Logout' }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  console.log(`${url}/home`);
  return (
    <Layout routes={authRoutes}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/* <Route path={`${url}/login`} component={Login} /> */}
          <Route path={`${url}/sign-up`} component={SignUp} />
          <Route path={`${url}/notAllowed`} component={NotAllowed} />
          <Redirect to={`${url}`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AuthRoutes;
