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

  const handleOpenModal = e => {
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
      <li className={s.item}>
        <Icons id={'settings'} />
        <button type="button" className={s.btn}>
          {t('popup.setting')}
        </button>
      </li>

      <li className={s.item}>
        <Icons id={'logout'} />
        <button onClick={handleOpenModal} type="button" className={s.btn}>
          {t('popup.logout')}
        </button>

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <ManagementCard
              title="Log out"
              description="Do you really want to leave?"
              secondButton="Log out"
              className="aligneRight"
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
