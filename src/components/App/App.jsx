import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import SigninPage from '../../pages/SigninPage/SigninPage';
import SharedLayout from '../common/SharedLayout/SharedLayout';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/global.module.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
};

export default App;
