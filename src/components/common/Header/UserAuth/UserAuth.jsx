import { Link } from 'react-router-dom';
import Icons from '../../../Icons/Icons';
import s from './UserAuth.module.css';
import { useTranslation } from 'react-i18next';

const UserAuth = () => {
  const { t } = useTranslation();

  return (
    <Link to="/signin" className={s.container}>
      <div className={s.title}>{t('userAuthTitle')}</div>
      <Icons id={'user'} size="28" stroke="#2f2f2f" />
    </Link>
  );
};

export default UserAuth;
