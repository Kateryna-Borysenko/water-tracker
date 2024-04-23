import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';
import { refreshUser } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { PrivatRoute } from '../PrivatRoute/PrivatRoute';
import { ToastContainer } from 'react-toastify';
import Spinner from '../../components/common/Spinner/Spinner';
import Loader from '../common/Loader/Loader';
import ForgotPasswordForm from '../forms/ForgotPasswordForm/ForgotPasswordForm';
import NewPasswordForm from '../forms/NewPasswordForm/NewPasswordForm';
import SharedLayout from '../common/SharedLayout/SharedLayout';
import '../../assets/styles/global.module.css';
import 'react-toastify/dist/ReactToastify.css';
const WelcomePage = lazy(() => import('pages/WelcomePage/WelcomePage'));
const SigninPage = lazy(() => import('pages/SigninPage/SigninPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('pages/SignupPage/SignupPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const ForgotPasswordPage = lazy(() =>
  import('pages/ForgotPasswordPage/ForgotPasswordPage'),
);

const App = () => {
  const dispatch = useDispatch();
  const { refreshingStatus } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (refreshingStatus) {
    return (
      <Loader>
        <Spinner color="#9ebbff" size="20px" />
      </Loader>
    );
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
