import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import UserLogoModal from './UserLogoModal/UserLogoModal';
import Icons from '../../../Icons/Icons';
import s from './UserLogo.module.css';

const UserLogo = () => {
  const {
    user: { email, avatarURL, username },
  } = useAuth();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(prevState => !prevState);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={s.container} onClick={handleOpenPopup}>
        {username && <p className={s.name}>{username}</p>}

        {avatarURL ? (
          <div className={s.avatarWrap}>
            <img className={s.avatar} src={avatarURL} alt="User avatar" />
          </div>
        ) : (
          <div className={s.avatarWrap}>
            {username ? username[0] : email[0]}
          </div>
        )}

        <Icons id={'down-arrow'} fill={'#407bff'} />
      </div>
      {isPopupOpen && <UserLogoModal handleClosePopup={handleOpenPopup} />}
    </div>
  );
};

export default UserLogo;
