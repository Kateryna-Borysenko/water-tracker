import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../../redux/auth/authOperations';
import Modal from '../../../Modal/Modal';
import ManagementCard from '../../../../ManagementCard/ManagementCard';
import SettingCard from '../../../../SettingCard/SettingCard';
import Icons from '../../../../Icons/Icons';
import s from './UserLogoModal.module.css';

const UserLogoModal = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleLogoutModal = () => {
    isLogoutModalOpen
      ? setIsLogoutModalOpen(false)
      : setIsLogoutModalOpen(true);
  };
  const toggleSettingModal = () => {
    isSettingModalOpen
      ? setIsSettingModalOpen(false)
      : setIsSettingModalOpen(true);
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <ul className={s.headerModal}>
      <li className={s.item}>
        <button type="button" className={s.btn} onClick={toggleSettingModal}>
          <Icons id={'settings'} />
          Setting
        </button>
      </li>

      <li className={s.item}>
        <button onClick={toggleLogoutModal} type="button" className={s.btn}>
          <Icons id={'logout'} />
          Log out
        </button>

        {isLogoutModalOpen && !isSettingModalOpen && (
          <Modal onClose={toggleLogoutModal}>
            <ManagementCard
              title="Log out"
              description="Do you really want to leave?"
              secondButton="Log out"
              className="aligneRight"
              onClick={handleLogoutUser}
            />
          </Modal>
        )}

        {isSettingModalOpen && !isLogoutModalOpen && (
          <Modal className="setting-card" onClose={toggleSettingModal}>
            <SettingCard />
          </Modal>
        )}
      </li>
    </ul>
  );
};

export default UserLogoModal;
