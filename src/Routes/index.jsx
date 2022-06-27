import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

const AdminRoutes = lazy(() => import('Routes/admin'));
const EmployeeRoutes = lazy(() => import('Routes/employee'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/employee" component={EmployeeRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
