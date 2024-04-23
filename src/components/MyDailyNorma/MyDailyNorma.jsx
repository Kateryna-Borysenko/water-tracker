import { useSelector } from 'react-redux';
import Subtitle from '../common/Subtitle/Subtitle';
import MyDailyNormaButton from './MyDailyNormaButton/MyDailyNormaButton';
import { selectWaterRate } from '../../redux/auth/authSelectors';
import { useTranslation } from 'react-i18next';
import s from './MyDailyNorma.module.css';

const MyDailyNorma = () => {
  const waterRate = useSelector(selectWaterRate);
  const DailyNormaL = (waterRate / 1000).toFixed(1);

  const { t } = useTranslation();

  return (
    <>
      <div className={s.dailyNormaContainer}>
        <Subtitle title={t('MyDailyNorma.MyDailyNormaTitle')} />
        <div className={s.normaValue}>
          <span>{DailyNormaL} {t('MyDailyNorma.MyDailyNormaL')}</span>
          <MyDailyNormaButton />
        </div>
      </div>
      <div className={s.imgBottle}></div>
    </>
  );
};

export default MyDailyNorma;
