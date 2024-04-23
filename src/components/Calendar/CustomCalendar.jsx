import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { startOfMonth, endOfMonth, addDays, isBefore, format } from 'date-fns';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { prevMonth, nextMonth } from '../../redux/calendar/calendarSlice';
import { PercentCellRender } from './PercentCellRender';
import { selectWaterRate } from '../../redux/auth/authSelectors';
import {
  selectCurrentDate,
  selectMonthlyData,
} from '../../redux/calendar/calendarSelectors';
import { apiGetMonthlyUsage } from '../../redux/calendar/calendarOperations';
import { selectWaterPortionsToday } from '../../redux/water/watersSelectors';
import s from './Calendar.module.css';

const CustomCalendar = ({ onDateSelect }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const waterUsage = useSelector(selectMonthlyData);
  const waterPortionsToday = useSelector(selectWaterPortionsToday);
  const waterRateEdit = useSelector(selectWaterRate);

  const startDay = startOfMonth(currentDate);
  const endDay = endOfMonth(currentDate);
  let date = startDay;

  const days = [];
  while (isBefore(date, endDay)) {
    days.push(new Date(date));
    date = addDays(date, 1);
  }

  const formattedDate = useMemo(
    () => format(currentDate, 'yyyy-MM-dd'),
    [currentDate],
  );

  useEffect(() => {
    dispatch(apiGetMonthlyUsage(formattedDate));
  }, [dispatch, formattedDate, waterPortionsToday, waterRateEdit]);

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
            {t(`calendar.${format(currentDate, 'MMMM')}`)}
            {', '}
            {format(currentDate, 'yyyy')}
          </span>
          <RightOutlined onClick={handleNextMonth} className={s.arrow} />
        </div>
      </div>
      <div className={s.tableCalendar}>
        {days.map(day => {
          const { percent, element } = PercentCellRender(day, waterUsage);
          return (
            <div
              key={format(day, 'yyyy-MM-dd')}
              className={s.calendarCell}
              onClick={e => onDateSelect.onInteraction(e, day)}
              onTouchEnd={e => onDateSelect.onInteraction(e, day)}
            >
              <div
                className={`${s.calendarDay} ${
                  percent && percent !== '100%' ? s.dayLessNorm : ''
                }`}
              >
                {format(day, 'd')}
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
