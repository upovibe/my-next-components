import React from "react";
import {
  format,
  addDays,
  startOfWeek,
  getHours,
  getMinutes,
  startOfHour,
  endOfHour,
} from "date-fns";
import { Event } from "../MegaCalender"; 

enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  minTime: number;
  maxTime: number;
  is24HourFormat: boolean;
  startDay?: number;
  endDay?: number;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onDateClick,
  minTime,
  maxTime,
  is24HourFormat,
  startDay = 0,
  endDay = 6,
}) => {
  const today = new Date();
  const currentTime = new Date();

  const formatHourLabel = (hour: number) => {
    return is24HourFormat
      ? `${hour}:00`
      : `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`;
  };

  // Cast startDay to the Day enum to satisfy TypeScript
  const startDate = startOfWeek(currentDate, { weekStartsOn: startDay as Day });

  const endDate = addDays(startDate, endDay - startDay);

  const timeSlots = [];
  for (let hour = minTime; hour < maxTime; hour++) {
    timeSlots.push(
      <div
        className="border w-full border-border dark:border-coal p-1 h-16 relative cursor-pointer"
        key={hour}
      >
        <div className="absolute z-10 w-20 mx-auto rounded-full text-center whitespace-nowrap bg-primary dark:bg-shade text-deep dark:text-light text-sm font-semibold p-1">
          {formatHourLabel(hour)}
        </div>
      </div>
    );
  }

  const days = [];
  let day = startDate;

  const handleDateClick = (date: Date) => {
    onDateClick(date);
  };

  while (day <= endDate) {
    const isToday = day.toDateString() === today.toDateString();

    days.push(
      <div
        key={day.toString()}
        className={`flex flex-col relative ${
          isToday ? "bg-highlight/50 dark:bg-ocean/50" : ""
        } w-full`}
      >
        <div
          className="font-medium text-soft dark:text-pale border border-border dark:border-coal p-2 text-center cursor-pointer"
          onClick={() => handleDateClick(day)}
        >
          {`${format(day, "d")} ${format(day, "EEE")}`}
        </div>
        {timeSlots.map((slot, index) => {
          const slotTime = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            minTime + index
          );
          const slotEndTime = endOfHour(slotTime);

          const hasEvents = events.some(
            (event) => event.start <= slotEndTime && event.end >= slotTime
          );

          return (
            <div
              key={index}
              className={`border border-border w-full dark:border-coal p-2 h-16 relative cursor-pointer ${
                hasEvents ? "border-none" : "border border-border dark:border-coal"
              }`}
              onClick={() => handleDateClick(day)}
            >
              {events
                .filter(
                  (event) => event.start <= slotEndTime && event.end >= slotTime
                )
                .map((event) => {
                  const isFirstSlot =
                    event.start <= slotTime &&
                    event.start >= startOfHour(slotTime);
                  const eventStartMinutes = event.start.getMinutes();
                  const eventEndMinutes = event.end.getMinutes();

                  const eventStartHour = event.start.getHours();
                  const eventEndHour = event.end.getHours();

                  const topOffset =
                    eventStartHour === slotTime.getHours()
                      ? (eventStartMinutes / 60) * 64
                      : 0;
                  const endOffset =
                    eventEndHour === slotTime.getHours()
                      ? (eventEndMinutes / 60) * 64
                      : 64;
                  const height = endOffset - topOffset;

                  return (
                    <div
                      key={event.id}
                      className={`absolute inset-x-0 flex flex-col items-center justify-center text-sm mb-2 shadow-2xl text-center z-10 text-light hover:text-white transition-all duration-200 ease-linear ${
                        isFirstSlot
                          ? "bg-highlight dark:bg-ocean"
                          : "bg-tertiary dark:bg-shadow"
                      }`}
                      style={{
                        height: `${height}px`,
                        top: `${topOffset}px`,
                        backgroundColor: event.color,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      <span className="font-semibold">
                        {isFirstSlot && event.title}
                      </span>
                      <span className="text-sm">
                        {isFirstSlot &&
                          format(
                            event.start,
                            is24HourFormat ? "HH:mm" : "h:mm a"
                          )}
                        {isFirstSlot && " - "}
                        {isFirstSlot &&
                          format(
                            event.end,
                            is24HourFormat ? "HH:mm" : "h:mm a"
                          )}
                      </span>
                    </div>
                  );
                })}
            </div>
          );
        })}

        {isToday && (
          <div
            className="absolute w-full h-0.5 bg-green-500"
            style={{
              top: `${
                (getHours(currentTime) - minTime) * 64 +
                (getMinutes(currentTime) / 60) * 64
              }px`,
              zIndex: 10,
            }}
          />
        )}
      </div>
    );

    day = addDays(day, 1);
  }

  const numDays = endDay - startDay + 1;

  return (
    <div className="grid grid-cols-8 gap-2 w-full min-w-[59rem] overflow-x-auto">
      <div className="col-span-1">
        <div className="font-bold text-soft dark:text-pale text-left border border-border dark:border-coal p-2">
          Time
        </div>
        {timeSlots}
      </div>
      <div
        className={`col-span-7 grid`}
        style={{ gridTemplateColumns: `repeat(${numDays}, minmax(200px, 1fr))` }}
      >
        {days}
      </div>
    </div>
  );
};

export default WeekView;
