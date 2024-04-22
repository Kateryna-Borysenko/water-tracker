import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../../redux/auth/authOperations';
import Modal from '../../../Modal/Modal';
import ManagementCard from '../../../../ManagementCard/ManagementCard';
import SettingsForm from '../../../../forms/SettingsForm/SettingsForm';
import Icons from '../../../../Icons/Icons';

import s from './UserLogoModal.module.css';
import { useTranslation } from 'react-i18next';

const UserLogoModal = ({ handleClosePopup }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClosePopup();
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  const handleOpenSettingModal = () => {
    //  setIsSettingModalOpen(prevState => !prevState);
    setIsSettingModalOpen(true);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  return (
    <ul onClose={handleClosePopup} className={s.headerModal}>
      <li>
        <button type="button" className={s.btn} onClick={handleOpenSettingModal}>
          <Icons id={'settings'} className={s.icon} />
          {t('popup.setting')}
        </button>
      </li>

      <li>
        <button onClick={handleOpenModal} type="button" className={s.btn}>
          <Icons id={'logout'} className={s.icon} />
          {t('popup.logout')}
        </button>
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <ManagementCard
              title={t('logout.title')}
              description={t('logout.description')}
              secondButton={t('logout.secondButton')}
              className="alignRight"
              onClick={handleLogoutUser}
              onClickSecondBtn={handleCloseModal}
            />
          </Modal>
        )}

        {isSettingModalOpen && (
          <Modal className="setting-card" onClose={handleCloseSettingModal}>
            <SettingsForm onClose={handleCloseSettingModal} />
          </Modal>
        )}
      </li>
    </ul>
  );
};

export default UserLogoModal;
