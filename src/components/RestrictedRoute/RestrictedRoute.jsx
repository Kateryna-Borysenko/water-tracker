import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RestrictedRoute = ({ children }) => {
  const { loggedInStatus } = useAuth();
  return loggedInStatus ? <Navigate to="/home" replace /> : children;
};
