import Container from '../Container/Container';
import Logo from './Logo/Logo';
import UserAuth from './UserAuth/UserAuth';
import UserLogo from './UserLogo/UserLogo';
import s from './Header.module.css';

const Header = () => {
  return (
    <header>
      <Container>
        <div className={s.header}>
          <Logo />

          <UserAuth />

          {/* <UserLogo /> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
