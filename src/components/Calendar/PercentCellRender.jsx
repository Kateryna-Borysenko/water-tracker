import moment from 'moment';
import s from './Calendar.module.css';

export const PercentCellRender = (date, handleDateSelect, waterUsage) => {
  const current = moment(date);
  const formattedDate = current.format('D, MMMM');

  const matchingDate = waterUsage.find(entry => entry.date === formattedDate);

  if (matchingDate) {
    return {
      percent: matchingDate.percent,
      dailyNorm: matchingDate.dailyNorm,
      quantity: matchingDate.quantity,
      element: (
        <div>
          <div className={s.dateText}>{matchingDate.percent}</div>
        </div>
      ),
    };
  } else {
    return {
      percent: '0%',
      dailyNorm: '0',
      quantity: '0',
      element: (
        <div>
          <div className={s.dateText}>0%</div>
        </div>
      ),
    };
  }
};
