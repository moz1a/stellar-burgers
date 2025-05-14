import React from 'react';
import { Navigate } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthentificated = useSelector(
    (state) => state.profile.isAuthentificated
  );
  return isAuthentificated ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
