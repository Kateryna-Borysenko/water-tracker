import AddWaterButton from '../AddWaterButton/AddWaterButton';
import TodayWaterItem from '../TodayWaterItem/TodayWaterItem';
import s from './TodayWaterList.module.css';

export const TodayWaterList = () => {
    const waterItems = [
        {
            _id: { $oid: "661c140a990b4e425f6518e4" },
            waterVolume: 120,
            date: { $date: "2024-04-16T17:15:27.177Z" }
        },
        {
            _id: { $oid: "661c1532990b4e425f6518ee" },
            waterVolume: 200,
            date: { $date: "2024-04-14T18:35:00.000Z" }
        }
    ];

    return (
        <div>
            <h3 className={s.todayTitle}>
                Today
            </h3>
            <ul className={s.todayWaterList}>
                {waterItems.map(item => (
                    <TodayWaterItem 
                        key={item._id.$oid}
                        waterVolume={item.waterVolume}
                        time={item.date.$date}
                    />
                ))}
            </ul>

            <AddWaterButton />
        </div>
    );
};

export default TodayWaterList;
