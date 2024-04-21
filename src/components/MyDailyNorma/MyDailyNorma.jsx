import Subtitle from '../common/Subtitle/Subtitle';
import MyDailyNormaButton from './MyDailyNormaButton/MyDailyNormaButton';
import s from './MyDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectWaterRate } from '../../redux/auth/authSelectors';

const MyDailyNorma = () => {
  const waterRate = useSelector(selectWaterRate);
  const DailyNormaL = waterRate / 1000;

  return (
    <div className={s.container}>
      <Subtitle title="My daily norma" />
      <div className={s.normValue}>
        <span>{DailyNormaL} L</span>
        <MyDailyNormaButton />
      </div>
    </div>
  );
};

export default MyDailyNorma;
