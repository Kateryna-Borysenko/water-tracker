import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import SharedLayout from '../common/SharedLayout/SharedLayout';
import SignupPage from '../../pages/SignupPage/SignupPage';
import SigninPage from '../../pages/SigninPage/SigninPage';
import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/global.module.css';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { PrivatRoute } from '../PrivatRoute/PrivatRoute';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/authOperations';
import Spinner from '../../components/common/Spinner/Spinner';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ForgotPasswordForm from '../forms/ForgotPasswordForm/ForgotPasswordForm';
import NewPasswordForm from '../forms/NewPasswordForm/NewPasswordForm';

const App = () => {
  const dispatch = useDispatch();
  const { refreshingStatus } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (refreshingStatus) {
    return <Spinner color="#9ebbff" size="20px" />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />

          <Route
            path="/signup"
            element={
              <RestrictedRoute>
                <SignupPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute>
                <SigninPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivatRoute>
                <HomePage />
              </PrivatRoute>
            }
          />
          <Route path="/new-password" element={<ForgotPasswordPage />}>
            <Route path="email" element={<ForgotPasswordForm />} />
            <Route path="password" element={<NewPasswordForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
};

export default App;
