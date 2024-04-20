import { useSelector } from 'react-redux';

import AddWaterButton from '../AddWaterButton/AddWaterButton';
import TodayWaterItem from '../TodayWaterItem/TodayWaterItem';
import { selectWaterPortionsToday } from '../../../redux/water/watersSelectors';

import s from './TodayWaterList.module.css';

export const TodayWaterList = () => {
  const waterItems = useSelector(selectWaterPortionsToday);

  return (
    <div className={s.listContainer}>
      <h3 className={s.todayTitle}>Today</h3>
      <ul className={s.todayWaterList}>
        {Array.isArray(waterItems) ? (
          waterItems.map(item => (
            <TodayWaterItem
              key={item._id.$oid}
              waterVolume={item.waterVolume}
              time={item.date.$date}
              id={item.id}
            />
          ))
        ) : (
          <p>No notes yet</p>
        )}
      </ul>

      <AddWaterButton />
    </div>
  );
};

export default TodayWaterList;
