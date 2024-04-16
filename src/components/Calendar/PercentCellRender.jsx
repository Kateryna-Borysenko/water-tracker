import moment from 'moment';
import s from './Calendar.module.css';

export const PercentCellRender = (date, handleDateSelect, waterUsage) => {
  const current = moment(date);
  const formattedDate = current.format('D, MMMM');

  const handleClick = e => {
    e.stopPropagation();
    handleDateSelect(e, current.toDate(), 'manual');
  };

  const matchingDate = waterUsage.filter(entry => entry.date === formattedDate);
  const percent = matchingDate.length > 0 ? matchingDate[0].percent : 0;

  if (percent) {
    return {
      percent,
      element: (
        <div onClick={handleClick}>
          <div className={s.dateText}>{percent}</div>
        </div>
      ),
    };
  } else {
    return '0';
  }
};
