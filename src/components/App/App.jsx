import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/global.module.css';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />

      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
      </Routes>
    </>
  );
};

export default App;
