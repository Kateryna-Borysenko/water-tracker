import MyDailyNormaButton from './MyDailyNormaButton';
import s from './MyDailyNorma.module.css';

const MyDailyNorma = () => {
  return (
    <div className={s.dailyNormaContainer}>
      <h2 className={s.dailyNormaTitle}>My daily norma</h2>
      <div className={s.normaValue}>
        <span>2 L</span>
        <MyDailyNormaButton />
      </div>
    </div>
  );
};

export default MyDailyNorma;
