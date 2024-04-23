import { format } from 'date-fns';
import s from './Calendar.module.css';

export const PercentCellRender = (date, waterUsage) => {
  const current = new Date(date);
  const formattedDate = format(current, 'd, MMMM');
  const matchingDate =
    waterUsage && waterUsage
      ? waterUsage.find(entry => entry.date === formattedDate)
      : undefined;
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
