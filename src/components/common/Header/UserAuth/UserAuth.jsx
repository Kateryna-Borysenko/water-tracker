import { Link } from 'react-router-dom';
// import userIcon from '../../../../assets/static/default-user.svg';
import s from './UserAuth.module.css';

const UserAuth = () => {
  return (
    <Link to="/signin" className={s.container}>
      <div className={s.title}>Sign in</div>
      {/* <img width="28" heigth="28" src={userIcon} alt="user icon" /> */}
    </Link>
  );
};

export default UserAuth;
