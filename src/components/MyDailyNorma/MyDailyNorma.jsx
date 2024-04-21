import Subtitle from '../common/Subtitle/Subtitle';
import MyDailyNormaButton from './MyDailyNormaButton';
import s from './MyDailyNorma.module.css';

const MyDailyNorma = () => {
  return (
    <>
      <div className={s.dailyNormaContainer}>
        <Subtitle title={'My daily norma'}></Subtitle>
        <div className={s.normaValue}>
          <span>2 L</span>
          <MyDailyNormaButton />
        </div>
      </div>
      <div className={s.imgBottle}></div>
    </>
  );
};

export default MyDailyNorma;
