import moment from 'moment';
import { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { PercentCellRender } from './PercentCellRender';
import s from './Calendar.module.css';
import waterUsage from './waterUsage.json';

const CustomCalendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const startDay = currentDate.clone().startOf('month').startOf('day');
  const endDay = currentDate.clone().endOf('month').endOf('day');
  let date = startDay.clone().subtract(1, 'day');

  const days = [];
  while (date.isBefore(endDay, 'day')) {
    days.push(date.add(1, 'day').clone());
  }

  const prevMonth = () => {
    setCurrentDate(prev => prev.clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(prev => prev.clone().add(1, 'month'));
  };

  const handleDaySelect = (e, day) => {
    onDateSelect(e, day, 'manual');
  };

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendar}>
        <h3 className={s.calendarHeaderMonth}>Month</h3>
        <div className={s.calendarHeaderNav}>
          <LeftOutlined onClick={prevMonth} className={s.arrow} />
          <span>{currentDate.format('MMMM, YYYY')}</span>
          <RightOutlined onClick={nextMonth} className={s.arrow} />
        </div>
      </div>
      <div className={s.tableCalendar}>
        {days.map(day => {
          const { percent, element } = PercentCellRender(
            day,
            handleDaySelect,
            waterUsage,
          );
          return (
            <div key={day.format('YYYY-MM-DD')} className={s.calendarCell}>
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
