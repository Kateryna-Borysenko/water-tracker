import { useSelector } from 'react-redux';
import {
  getLoading,
  getError,
  getUser,
  getLoggedInStatus,
  getToken,
  getRefreshingStatus,
} from '../redux/auth/authSelectors';

export const useAuth = () => {
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const user = useSelector(getUser);
  const loggedInStatus = useSelector(getLoggedInStatus);
  const token = useSelector(getToken);
  const refreshingStatus = useSelector(getRefreshingStatus);

  return {
    loading,
    error,
    user,
    loggedInStatus,
    token,
    refreshingStatus,
  };
};
