import { useSelector } from 'react-redux';
import Subtitle from '../common/Subtitle/Subtitle';
import MyDailyNormaButton from './MyDailyNormaButton/MyDailyNormaButton';
import { selectWaterRate } from '../../redux/auth/authSelectors';
import s from './MyDailyNorma.module.css';

const MyDailyNorma = () => {
  const waterRate = useSelector(selectWaterRate);
  const DailyNormaL = waterRate / 1000;

  return (
    <>
      <div className={s.dailyNormaContainer}>
        <Subtitle title="My daily norma" />
        <div className={s.normaValue}>
          <span>{DailyNormaL} L</span>
          <MyDailyNormaButton />
        </div>
      </div>
      <div className={s.imgBottle}></div>
    </>
  );
};

export default MyDailyNorma;
