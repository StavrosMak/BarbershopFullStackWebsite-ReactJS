import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function StaticDatePickerLandscape({ handleDateChange, selectedDate, currentDate }) {

  const isBeforeCurrentDate = (date) => {
    return date.isBefore(currentDate, 'day'); // Assuming the selectedDate and currentDate are Dayjs objects
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        className="calendar-header"
        orientation="portrait"
        value={selectedDate}
        onChange={handleDateChange}
        componentsProps={{ actionBar: { actions: [] } }}
        shouldDisableDate={(date) => isBeforeCurrentDate(date)} // Disable previous dates in the date picker


      />
    </LocalizationProvider>
  );
}