import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = true; //localStorage.getItem('authToken'); // Проверяю наличие токена
  return token ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
