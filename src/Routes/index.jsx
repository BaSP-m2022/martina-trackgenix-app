import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import AdminRoutes from './admin';
// import EmployeeRoutes from './employee';
// import AuthRoutes from './auth';
import PrivateRoute from './PrivateRoute';

const HomeRoutes = lazy(() => import('Routes/home'));
const AdminRoutes = lazy(() => import('Routes/admin'));
const EmployeeRoutes = lazy(() => import('Routes/employee'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/home" component={HomeRoutes} />
        <PrivateRoute path="/super-admin" role="Admin" component={AdminRoutes} />
        <PrivateRoute path="/employee" role="Employee" component={EmployeeRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        <Redirect to="/home" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
