import { Link } from 'react-router-dom';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={s.container}>
      icon
      <div className={s.title}>WaterTracker</div>
    </Link>
  );
};

export default Logo;
