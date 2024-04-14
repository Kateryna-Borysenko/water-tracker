import Logo from './Logo/Logo';
import UserAuth from './UserAuth/UserAuth';
import UserLogo from './UserLogo/UserLogo';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />

      <UserAuth />

      {/* <UserLogo /> */}
    </header>
  );
};

export default Header;
