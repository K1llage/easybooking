import React, { useState } from 'react';

interface BookingCalendarProps {
  onSelectDate: (date: string) => void;
  selectedDate?: string;
  minDate?: string;
  maxDate?: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  onSelectDate,
  selectedDate,
  minDate,
  maxDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleSelectDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    onSelectDate(dateString);
  };

  const monthName = currentDate.toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric',
  });

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate || !day) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    return dateString === selectedDate;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          ←
        </button>
        <h3 className="text-xl font-bold text-gray-900">{monthName}</h3>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day !== null && handleSelectDay(day)}
            disabled={day === null}
            className={`p-2 rounded-lg text-sm font-medium transition ${
              day === null
                ? 'invisible'
                : isSelected(day)
                  ? 'bg-blue-600 text-white'
                  : isToday(day)
                    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
