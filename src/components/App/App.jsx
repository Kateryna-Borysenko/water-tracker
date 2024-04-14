import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import SharedLayout from '../common/SharedLayout/SharedLayout';
import SignupPage from '../../pages/SignupPage/SignupPage';
import SigninPage from '../../pages/SigninPage/SigninPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
};

export default App;
