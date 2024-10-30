import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  toDate,
} from "date-fns";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  is24HourFormat: boolean;
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  onExtraEventClick?: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  is24HourFormat,
  onEventClick,
  onDateClick,
  onExtraEventClick,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (date: Date) => {
    onDateClick(date);
  };

  // Weekday names header
  const weekdaysHeader = (
    <div className="grid grid-cols-7 w-full min-w-[59rem] text-center font-semibold">
      {weekdayNames.map((dayName) => (
        <div className="p-2" key={dayName}>
          {dayName}
        </div>
      ))}
    </div>
  );

  // Calendar days
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const dayEvents = events.filter(event => isSameDay(event.start, day));
      const displayedEvents = dayEvents.slice(0, 2);
      const extraEventCount = dayEvents.length - displayedEvents.length;

      days.push(
        <div
          className={`p-4 border border-border dark:border-coal text-deep dark:text-light cursor-pointer ${
            !isSameMonth(day, monthStart) ? "bg-secondary dark:bg-dim" : ""
          } ${isSameDay(day, new Date()) ? "bg-highlight/50 dark:bg-ocean/50" : ""}`}
          key={day.toString()}
          onClick={() => handleDateClick(day)}
        >
          <span>{format(day, "d")}</span>
          <div className="mt-2">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                style={{ backgroundColor: event.color }}
                className="flex flex-col text-sm mb-2 rounded-xl shadow-2xl text-center z-10 p-1 text-light hover:text-white transition-all duration-200 ease-linear"
              >
                <span className="font-semibold">{event.title}</span>
                <span className="text-xs">
                  {format(event.start, is24HourFormat ? "HH:mm" : "h:mm a")}{" - "}
                  {format(event.end, is24HourFormat ? "HH:mm" : "h:mm a")}
                </span>
              </div>
            ))}
            {extraEventCount > 0 && (
              <div
                className="text-sm font-semibold text-center text-blue-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onExtraEventClick) {
                    onExtraEventClick(day);
                  }
                }}
              >
                +{extraEventCount} more
              </div>
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 w-full min-w-[59rem]" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div>
      {weekdaysHeader}
      {rows}
    </div>
  );
};

export default MonthView;
