import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import UserLogoModal from './UserLogoModal/UserLogoModal';
import Icons from '../../../Icons/Icons';
import s from './UserLogo.module.css';

const UserLogo = () => {
  const {
    user: { email, avatarURL, username },
  } = useAuth();

  const defaultUserName = email
    .substring(0, email.indexOf('@'))
    .replace(/^\w/, c => c.toUpperCase());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <div onClick={handleOpenModal} className={s.container}>
      <p className={s.name}>{username ? username : defaultUserName}</p>

      {avatarURL ? (
        <div className={s.avatarWrap}>
          <img className={s.avatar} src={avatarURL} alt="User avatar" />
        </div>
      ) : (
        <div className={s.avatarWrap}>
          {username ? username[0] : defaultUserName[0]}
        </div>
      )}

      <Icons id={'down-arrow'} fill={'#407bff'} />

      {isModalOpen && <UserLogoModal />}
    </div>
  );
};

export default UserLogo;
