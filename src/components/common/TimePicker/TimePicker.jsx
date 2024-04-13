import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = time => {
    setSelectedTime(time);
  };

  return (
    <DatePicker
      selected={selectedTime}
      onChange={handleTimeChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="HH:mm"
    />
  );
};

export default TimePicker;
