import dayjs from 'dayjs';
import { useState } from 'react';
import CustomCalendar from './CustomCalendar';
import DateModal from './DateModal';
import waterUsage from './waterUsage.json';

const Calendar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedData, setSelectedData] = useState({
    dailyNorm: 0,
    percent: 0,
    quantity: 0,
  });
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleDateSelect = (e, date) => {
    e.stopPropagation();
    const dayData = waterUsage.find(
      d => dayjs(d.date).format('D, MMMM') === dayjs(date).format('D, MMMM'),
    );
    const rect = e.target.getBoundingClientRect();
    const position = {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };

    if (dayData) {
      setSelectedData(dayData);
      setSelectedDate(date);
      setIsVisible(true);
      setSelectedPosition(position);
    }
  };

  return (
    <>
      <CustomCalendar onDateSelect={handleDateSelect} />
      <DateModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        selectedDate={selectedDate}
        data={selectedData}
        position={selectedPosition}
      />
    </>
  );
};

export default Calendar;
