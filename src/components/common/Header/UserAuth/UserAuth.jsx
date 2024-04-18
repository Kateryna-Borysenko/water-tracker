import { Link } from 'react-router-dom';
import Icons from '../../../Icons/Icons';
import s from './UserAuth.module.css';

const UserAuth = () => {
  return (
    <Link to="/signin" className={s.container}>
      <div className={s.title}>Sign in</div>
      <Icons id={'user'} size="28" stroke="#2f2f2f" />
    </Link>
  );
};

export default UserAuth;
