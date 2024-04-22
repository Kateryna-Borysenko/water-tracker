import { Link } from 'react-router-dom';
import logo from '../../../../assets/static/logo.svg';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={s.container}>
      <img
        className={s.icon}
        src={logo}
        alt="Logo of water tracker, a drop of water"
      />
      <p className={s.title}>Tracker of water</p>
    </Link>
  );
};

export default Logo;
