import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../../redux/auth/authOperations';
import Modal from '../../../Modal/Modal';
import ManagementCard from '../../../../ManagementCard/ManagementCard';
import Icons from '../../../../Icons/Icons';
import s from './UserLogoModal.module.css';
import { useTranslation } from 'react-i18next';

const UserLogoModal = ({ handleClosePopup }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <ul onClose={handleClosePopup} className={s.headerModal}>
      <li>
        <button type="button" className={s.btn}>
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
      </li>
    </ul>
  );
};

export default UserLogoModal;
