import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './DatePicker.css';


const DatePicker = forwardRef((props, ref) => {
    const [selectedDate, setSelectedDate] = useState({
      day: '',
      month: '',
      year: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSelectedDate((prevDate) => ({
        ...prevDate,
        [name]: value,
      }));
    };
  
    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  
    const getDaysArray = (daysInMonth) => Array.from({ length: daysInMonth }, (_, index) => index + 1);
  
    const getMonthsArray = () => Array.from({ length: 12 }, (_, index) => index + 1);
  
    const years = Array.from({ length: 20 }, (_, index) => 2005 + index);
  
    useImperativeHandle(ref, () => ({
      getSelectedDate: () => selectedDate,
    }));
  
    return (
      <div className="date-picker-container">
        <div className="date-picker-grid">
          <div className="date-picker-input">
            <select
              name="year"
              value={selectedDate.year}
              onChange={handleInputChange}
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="date-picker-input">
            <select
              name="month"
              value={selectedDate.month}
              onChange={handleInputChange}
            >
              <option value="">Month</option>
              {getMonthsArray().map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className="date-picker-input">
            <select
              name="day"
              value={selectedDate.day}
              onChange={handleInputChange}
            >
              <option value="">Day</option>
              {selectedDate.year && selectedDate.month && getDaysArray(getDaysInMonth(selectedDate.year, selectedDate.month)).map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  });
  
  export default DatePicker;
  