import { useAuth } from '../../../hooks/useAuth';
import Logo from './Logo/Logo';
import UserAuth from './UserAuth/UserAuth';
import UserLogo from './UserLogo/UserLogo';
import LangsSwitcher from '../../LangsSwitcher/LangsSwitcher';
import s from './Header.module.css';

const Header = () => {
  const { loggedInStatus, loading } = useAuth();

  return (
    <header className={s.header}>
      <div className={s.logoLngsWrap}>
        <Logo />
        <LangsSwitcher />
      </div>
      {loggedInStatus ? <UserLogo /> : <UserAuth />}
    </header>
  );
};

export default Header;
