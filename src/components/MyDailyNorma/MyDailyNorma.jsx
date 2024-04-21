import Subtitle from '../common/Subtitle/Subtitle';
import MyDailyNormaButton from './MyDailyNormaButton/MyDailyNormaButton';
import s from './MyDailyNorma.module.css';

const MyDailyNorma = () => {
  return (
    <div className={s.container}>
      <Subtitle title="My daily norma" />
      <div className={s.normValue}>
        <span>2 L</span>
        <MyDailyNormaButton />
      </div>
    </div>
  );
};

export default MyDailyNorma;
