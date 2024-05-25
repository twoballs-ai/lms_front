import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children, requiredRole }) => {

  const { authenticated, role } = useContext(AuthContext);

  if (!authenticated) {
    console.log("Not authenticated");
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    console.log("Incorrect role");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;