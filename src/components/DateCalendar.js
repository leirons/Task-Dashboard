import * as React from 'react';
import {DatePicker} from '@mui/x-date-pickers';

const DateCalendar = ({onChange, rows}) => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
        />
    );
};

export default DateCalendar

