import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { prevMonth, nextMonth } from '../../redux/calendar/calendarSlice';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { PercentCellRender } from './PercentCellRender';
import { apiGetMonthlyUsage } from '../../redux/calendar/calendarOperations';
import {
  selectCurrentDate,
  selectMonthlyData,
} from '../../redux/calendar/calendarSelectors';
import s from './Calendar.module.css';

const CustomCalendar = ({ onDateSelect }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const waterUsage = useSelector(selectMonthlyData);

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
  }, [dispatch, formattedDate]);

  const handlePrevMonth = () => {
    dispatch(prevMonth());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
  };

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendar}>
        <h3 className={s.calendarHeaderMonth}>Month</h3>
        <div className={s.calendarHeaderNav}>
          <LeftOutlined onClick={handlePrevMonth} className={s.arrow} />
          <span>{currentDate.format('MMMM, YYYY')}</span>
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
