import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../../../Modal/Modal';
import ManagementCard from '../../../../ManagementCard/ManagementCard';
import SettingsForm from '../../../../forms/SettingsForm/SettingsForm';
import Icons from '../../../../Icons/Icons';
import { getLoading } from '../../../../../redux/auth/authSelectors';
import { logoutUser } from '../../../../../redux/auth/authOperations';
import { logoutUserWaterAction } from '../../../../../redux/water/watersSlice';
import { logoutUserCalendarAction } from '../../../../../redux/calendar/calendarSlice';
import s from './UserLogoModal.module.css';

const UserLogoModal = ({ handleClosePopup }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  const handleOpenModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClosePopup();
  };

  const handleLogoutUser = async () => {
    const isLogout = await dispatch(logoutUser());
    if (isLogout.error) return toast.error(`Failed logout user`);
    dispatch(logoutUserWaterAction());
    dispatch(logoutUserCalendarAction());
  };

  const handleOpenSettingModal = () => {
    setIsSettingModalOpen(true);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
    handleClosePopup();
  };

  return (
    <ul onClose={handleClosePopup} className={s.headerModal}>
      <li>
        <button
          type="button"
          className={s.btn}
          onClick={handleOpenSettingModal}
        >
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
          <Modal onClose={handleCloseModal} className="managment-card">
            <ManagementCard
              title={t('logout.title')}
              description={t('logout.description')}
              secondButton={t('logout.secondButton')}
              className="alignRight"
              onClick={handleLogoutUser}
              onClickSecondBtn={handleCloseModal}
              disabledYesBtn={loading}
              loading={loading}
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
