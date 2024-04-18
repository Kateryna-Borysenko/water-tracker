import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../../redux/auth/authOperations';
import Modal from '../../../Modal/Modal';
import ManagementCard from '../../../../ManagementCard/ManagementCard';
import SettingCard from '../../../../SettingCard/SettingCard';
import Icons from '../../../../Icons/Icons';
import s from './UserLogoModal.module.css';

const UserLogoModal = ({ handleClosePopup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = e => {
    e.stopPropagation();
    setIsModalOpen(prevState => !prevState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSettingModal = e => {
    e.stopPropagation();
    setIsSettingModalOpen(prevState => !prevState);
  };

  // const handleCloseSettingModal = () => {
  //   setIsSettingModalOpen(false);
  // };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <ul onClose={handleClosePopup} className={s.headerModal}>
      <li className={s.item}>
        <Icons id={'settings'} />
        <button
          type="button"
          className={s.btn}
          onClick={handleOpenSettingModal}
        >
          Setting
        </button>
      </li>

      <li className={s.item}>
        <Icons id={'logout'} />
        <button onClick={handleOpenModal} type="button" className={s.btn}>
          Log out
        </button>

        {isModalOpen && !isSettingModalOpen && (
          <Modal onClose={handleCloseModal}>
            <ManagementCard
              title="Log out"
              description="Do you really want to leave?"
              secondButton="Log out"
              className="aligneRight"
              onClick={handleLogoutUser}
            />
          </Modal>
        )}

        {isSettingModalOpen && !isModalOpen && (
          <Modal className="setting-card">
            <SettingCard />
          </Modal>
          //onClose={handleCloseSettingModal}
        )}
      </li>
    </ul>
  );
};

export default UserLogoModal;
