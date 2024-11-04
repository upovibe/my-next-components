import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  startOfDay,
} from "date-fns";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}

interface YearViewProps {
  currentDate: Date;
  events: Event[];
  onYearClick: (year: number) => void;
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const DayCell: React.FC<{
  day: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  eventColor?: string;
  hasEvent: boolean;
  onClick: (day: Date) => void;
  onEventClick?: (event: Event) => void;
  event?: Event;
}> = ({ day, isCurrentMonth, isToday, eventColor, hasEvent, onClick, onEventClick, event }) => (
  <div
    key={day.toString()}
    className={`p-1 text-sm border border-border dark:border-coal cursor-pointer 
                ${!isCurrentMonth ? "bg-secondary dark:bg-dim" : ""} 
                ${isToday ? "bg-highlight/50 dark:bg-ocean/50" : ""} 
                ${hasEvent ? "text-white border-none rounded shadow-xl" : "text-soft dark:text-pale"}`}
    onClick={() => {
      if (hasEvent && event && onEventClick) {
        onEventClick(event);
      } else {
        onClick(day);
      }
    }}
    style={{ backgroundColor: eventColor }}
  >
    {format(day, "d")}
  </div>
);

const MonthView: React.FC<{
  monthStart: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}> = ({ monthStart, events, onDateClick, onEventClick }) => {
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const weeks = [];

  let day = startDate;
  while (day <= endDate) {
    const days = Array.from({ length: 7 }, () => {
      const eventForDay = events.find((event) =>
        isSameDay(startOfDay(event.start), day)
      );
      const eventColor = eventForDay ? eventForDay.color : "";
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = isSameDay(day, new Date());
      const hasEvent = Boolean(eventForDay);

      const cell = (
        <DayCell
          key={day.toString()}
          day={day}
          isCurrentMonth={isCurrentMonth}
          isToday={isToday}
          eventColor={eventColor}
          hasEvent={hasEvent}
          onClick={onDateClick}
          onEventClick={onEventClick}
          event={eventForDay}
        />
      );
      day = addDays(day, 1);
      return cell;
    });

    weeks.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
  }

  return (
    <div className="p-4 border border-border dark:border-coal rounded-lg">
      <h3 className="text-center font-bold mb-2 text-deep dark:text-light">
        {format(monthStart, "MMMM")}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-xs text-deep dark:text-light">
            {day}
          </div>
        ))}
      </div>
      {weeks}
    </div>
  );
};

const YearView: React.FC<YearViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const currentYear = currentDate.getFullYear();
  return (
    <div className="w-full min-w-[59rem]">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 12 }, (_, month) => (
          <MonthView
            key={month}
            monthStart={startOfMonth(new Date(currentYear, month, 1))}
            events={events}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default YearView;
