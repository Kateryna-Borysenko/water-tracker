import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../../redux/auth/authOperations';
import Icons from '../../../../Icons/Icons';
import s from './UserLogoModal.module.css';

const UserLogoModal = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ul className={s.headerModal}>
      <li className={s.item}>
        <Icons id={'settings'} />
        <button type="button" className={s.btn}>
          Setting
        </button>
      </li>

      <li className={s.item}>
        <Icons id={'logout'} />
        <button onClick={handleLogout} type="button" className={s.btn}>
          Log out
        </button>
      </li>
    </ul>
  );
};

export default UserLogoModal;
