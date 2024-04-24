import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddWaterButton from '../AddWaterButton/AddWaterButton';
import TodayWaterItem from '../TodayWaterItem/TodayWaterItem';
import { selectWaterPortionsToday } from '../../../redux/water/watersSelectors';

import s from './TodayWaterList.module.css';

export const TodayWaterList = () => {
  const waterItems = useSelector(selectWaterPortionsToday);

  const { t } = useTranslation();

  return (
    <div className={s.listContainer}>
      <h3 className={s.todayTitle}>{t('TodayWater.TodayWaterTitle')}</h3>
      <ul className={s.todayWaterList}>
        {waterItems.length !== 0 ? (
          waterItems.map((item, index) => (
            <TodayWaterItem
              key={index}
              waterVolume={item.waterVolume}
              time={item.date}
              id={item._id}
            />
          ))
        ) : (
          <p>{t('TodayWater.TodayWaterMessage')}</p>
        )}
      </ul>

      <AddWaterButton />
    </div>
  );
};

export default TodayWaterList;
