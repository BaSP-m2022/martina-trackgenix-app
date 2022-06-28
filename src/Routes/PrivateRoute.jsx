import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'Components/Shared';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const role = useSelector((state) => state.auth.authenticated?.role);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <Route
          {...rest}
          render={(routeProps) => {
            if (role === rest.role) {
              return <RouteComponent {...routeProps} />;
            }
            if (role && !error) {
              return <Redirect to={'/login'} />;
            }
            return <Redirect to={'/login'} />;
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
