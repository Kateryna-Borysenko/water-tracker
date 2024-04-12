import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/global.module.css';
import SignupPage from '../../pages/SignupPage/SignupPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
};

export default App;
