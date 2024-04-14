import { useState } from 'react';
import downArrow from '../../../../assets/static/down-arrow.svg';
import UserLogoModal from './UserLogoModal/UserLogoModal';
import s from './UserLogo.module.css';

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <div onClick={handleOpenModal} className={s.container}>
        {true && (
          <>
            <p className={s.name}>David</p>
            {/* <div className={s.avatarWrap}>
            <img className={s.avatar} src={'user.avatar'} alt="User avatar" />
          </div> */}
          </>
        )}

        {true && <div className={s.avatarWrap}>D</div>}

        {/* <img
        className={s.avatar}
        src={'user.email[0].toApperCase()'}
        alt="User avatar"
      /> */}

        <img className={s.icon} src={downArrow} alt="Icon down arrow" />
      </div>

      {isModalOpen && <UserLogoModal />}
    </>
  );
};

export default UserLogo;
