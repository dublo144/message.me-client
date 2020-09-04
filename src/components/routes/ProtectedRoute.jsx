import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, redirectPath = null, ...rest }) => {
  const { isLoggedIn } = useAuthState();
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect to={redirectPath ? redirectPath : '/'} />
        )
      }
    />
  );
};

export default ProtectedRoute;
