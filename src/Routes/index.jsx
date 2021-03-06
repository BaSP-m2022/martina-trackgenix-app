import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import { getAuth } from 'redux/auth/thunks';
import PrivateRoute from 'Routes/PrivateRoute';
import { Loader } from 'Components/Shared';

const HomeRoutes = lazy(() => import('Routes/home'));
const SuperAdminRoutes = lazy(() => import('Routes/SuperAdmin'));
const AdminRoutes = lazy(() => import('Routes/admin'));
const EmployeeRoutes = lazy(() => import('Routes/employee'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  const dispatch = useDispatch();

  const token = useSelector((store) => store.auth.authenticated?.token);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <Suspense fallback={<Loader show={isLoading} />}>
      <Switch>
        <Route path="/home" component={HomeRoutes} />
        <PrivateRoute path="/super-admin" role="SUPERADMIN" component={SuperAdminRoutes} />
        <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
        <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        <Redirect to="/home" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
