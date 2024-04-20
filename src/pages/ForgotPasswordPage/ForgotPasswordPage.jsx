import { Outlet } from 'react-router-dom';
import s from './ForgotPasswordPage.module.css';

const ForgotPasswordPage = () => {
  return (
    <div className={s.container}>
      <Outlet />
    </div>
  );
};

export default ForgotPasswordPage;
