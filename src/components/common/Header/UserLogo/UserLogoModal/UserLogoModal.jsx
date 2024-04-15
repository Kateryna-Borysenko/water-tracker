// import settingIcon from '../../../../../assets/static/settings.svg';
// import exitIcon from '../../../../../assets/static/logout.svg';
import s from './UserLogoModal.module.css';

const UserLogoModal = () => {
  return (
    <ul className={s.headerModal}>
      <li className={s.item}>
        {/* <img width="16" height="16" src={settingIcon} alt="Icon setting" /> */}
        <p>Setting</p>
      </li>

      <li className={s.item}>
        {/* <img width="16" height="16" src={exitIcon} alt="Icon log out" /> */}
        <p>Log out</p>
      </li>
    </ul>
  );
};

export default UserLogoModal;
