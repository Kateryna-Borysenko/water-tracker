import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { prevMonth, nextMonth } from '../../redux/calendar/calendarSlice';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { PercentCellRender } from './PercentCellRender';
import { apiGetMonthlyUsage } from '../../redux/calendar/calendarOperations';
import {
  selectCurrentDate,
  selectMonthlyData,
} from '../../redux/calendar/calendarSelectors';
import s from './Calendar.module.css';
import { selectWaterPortionsToday } from '../../redux/water/watersSelectors';

const CustomCalendar = ({ onDateSelect }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const waterUsage = useSelector(selectMonthlyData);
  const waterPortionsToday = useSelector(selectWaterPortionsToday);

  const startDay = currentDate.clone().startOf('month').startOf('day');
  const endDay = currentDate.clone().endOf('month').endOf('day');
  let date = startDay.clone().subtract(1, 'day');

  const days = [];
  while (date.isBefore(endDay, 'day')) {
    days.push(date.add(1, 'day').clone());
  }

  const formattedDate = useMemo(
    () => currentDate.format('YYYY-MM-DD'),
    [currentDate],
  );

  useEffect(() => {
    dispatch(apiGetMonthlyUsage(formattedDate));
  }, [dispatch, formattedDate, waterPortionsToday]);

  const handlePrevMonth = () => {
    dispatch(prevMonth());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
  };

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendar}>
        <h3 className={s.calendarHeaderMonth}>{t('calendar.month')}</h3>
        <div className={s.calendarHeaderNav}>
          <LeftOutlined onClick={handlePrevMonth} className={s.arrow} />
          <span>
            {t(`calendar.${currentDate.format('MMMM')}`)}
            {', '}
            {currentDate.format('YYYY')}
          </span>
          <RightOutlined onClick={handleNextMonth} className={s.arrow} />
        </div>
      </div>
      <div className={s.tableCalendar}>
        {days.map(day => {
          const { percent, element } = PercentCellRender(
            day,
            onDateSelect,
            waterUsage,
          );
          return (
            <div
              key={day.format('YYYY-MM-DD')}
              className={s.calendarCell}
              onClick={e => onDateSelect(e, day)}
            >
              <div
                className={`${s.calendarDay} ${
                  percent && percent !== '100%' ? s.dayLessNorm : ''
                }`}
              >
                {day.format('D')}
              </div>
              <div className={s.dateText}>{element}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
