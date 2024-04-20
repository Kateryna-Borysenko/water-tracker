import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomCalendar from './CustomCalendar';
import DaysGeneralStats from './DaysGeneralStats';
import { openModal, initialState } from '../../redux/calendar/calendarSlice';
import { selectMonthlyData } from '../../redux/calendar/calendarSelectors';

const Calendar = () => {
  const dispatch = useDispatch();
  const waterUsage = useSelector(selectMonthlyData);
  const handleDateSelect = (e, date) => {
    e.stopPropagation();
    const dayData = waterUsage.find(
      d => moment(d.date).format('D, MMMM') === moment(date).format('D, MMMM'),
    );
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
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

  return (
    <>
      <CustomCalendar onDateSelect={handleDateSelect} />
      <DaysGeneralStats />
    </>
  );
};

export default Calendar;
