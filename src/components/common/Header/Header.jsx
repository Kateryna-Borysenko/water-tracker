import Container from '../Container/Container';
import Logo from './Logo/Logo';
import UserAuth from './UserAuth/UserAuth';
import UserLogo from './UserLogo/UserLogo';
import s from './Header.module.css';
import { useAuth } from '../../../hooks/useAuth';

const Header = () => {
  const { loggedInStatus } = useAuth();

  return (
    <header className={s.header}>
      <Logo />
      {loggedInStatus ? <UserLogo /> : <UserAuth />}
    </header>
  );
};

export default Header;
