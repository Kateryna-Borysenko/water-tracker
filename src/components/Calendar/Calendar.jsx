import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import CustomCalendar from './CustomCalendar';
import DaysGeneralStats from './DaysGeneralStats';
import { openModal, initialState } from '../../redux/calendar/calendarSlice';
import { selectMonthlyData } from '../../redux/calendar/calendarSelectors';
import modalLeftPosition from './helpers';

const Calendar = () => {
  const dispatch = useDispatch();
  const waterUsage = useSelector(selectMonthlyData);
  const handleDateSelect = (e, date) => {
    e.stopPropagation();
    const dayData = waterUsage.find(
      d => format(d.date, 'd, MMMM') === format(date, 'd, MMMM'),
    );
    const rect = e.currentTarget.getBoundingClientRect();

    let xOffset = 0;
    let yOffset = 0;

    if (window.innerWidth > 1439) {
      xOffset = -250;
      yOffset = -210;
    } else if (window.innerWidth > 767) {
      xOffset = -250;
      yOffset = -190;
    } else {
      xOffset = -50;
      yOffset = -100;
    }

    const position = {
      position: 'fixed',
      left: `${modalLeftPosition(xOffset, rect.left + window.scrollX)}px`,
      top: `${rect.top + yOffset}px`,
    };

    const modalInitialState = initialState.modalData;
    if (dayData) {
      dispatch(
        openModal({
          selectedDate: date.toISOString(),
          modalData: {
            dailyNorm: dayData.dailyNorm,
            percent: dayData.percent,
            quantity: dayData.quantity,
          },
          position,
        }),
      );
    } else {
      dispatch(
        openModal({
          selectedDate: date.toISOString(),
          modalData: modalInitialState,
          position,
        }),
      );
    }
  };

  const handleInteraction = (e, date) => {
    e.preventDefault();
    handleDateSelect(e, date);
  };

  const handlers = {
    onDateSelect: handleDateSelect,
    onInteraction: handleInteraction,
  };
  return (
    <>
      <CustomCalendar onDateSelect={handlers} />
      <DaysGeneralStats />
    </>
  );
};

export default Calendar;
