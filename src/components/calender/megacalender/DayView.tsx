import React from "react";
import { format, getHours, getMinutes, startOfHour, endOfHour } from "date-fns";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}

interface DayViewProps {
  currentDate: Date;
  minTime: number;
  maxTime: number;
  is24HourFormat: boolean;
  onEventClick: (event: Event) => void;
  events: Event[];
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  minTime,
  maxTime,
  is24HourFormat,
  onEventClick,
  events,
}) => {
  const formatHourLabel = (hour: number) => {
    if (is24HourFormat) {
      return `${hour}:00`;
    } else {
      const suffix = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour}:00 ${suffix}`;
    }
  };

  const timeSlots = [];
  for (let hour = minTime; hour < maxTime; hour++) {
    timeSlots.push(
      <div
        className="border border-border dark:border-col p-1 h-16 relative cursor-pointer"
        key={hour}
      >
        <div className="absolute z-20 w-20 mx-auto rounded-full text-center whitespace-nowrap bg-primary dark:bg-shade text-deep dark:text-light text-sm font-semibold p-1">
          {formatHourLabel(hour)}
        </div>

        {events
          .filter(
            (event) =>
              event.start <=
                endOfHour(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    hour
                  )
                ) &&
              event.end >=
                startOfHour(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    hour
                  )
                )
          )
          .map((event) => {
            const isFirstSlot = event.start.getHours() === hour;
            const eventStartMinutes = event.start.getMinutes();
            const eventEndMinutes = event.end.getMinutes();

            const eventStartHour = event.start.getHours();
            const eventEndHour = event.end.getHours();

            const topOffset =
              eventStartHour === hour ? (eventStartMinutes / 60) * 64 : 0;
            const endOffset =
              eventEndHour === hour ? (eventEndMinutes / 60) * 64 : 64;
            const height = endOffset - topOffset;

            return (
              <div
                key={event.id}
                className={`absolute inset-x-0 flex flex-col items-center justify-center text-sm mb-2 shadow-2xl text-center z-10 text-light hover:text-white transition-all duration-200 ease-linear ${
                  isFirstSlot ? "bg-highlight dark:bg-ocean text-sm p-1" : "bg-blue-100"
                }`}
                style={{
                  height: `${height}px`,
                  top: `${topOffset}px`,
                  backgroundColor: event.color,
                }}
                onClick={() => onEventClick(event)}
              >
                <span className="font-semibold">
                  {isFirstSlot && event.title}
                </span>
                <span className="text-sm">
                  {isFirstSlot &&
                    format(event.start, is24HourFormat ? "HH:mm" : "h:mm a")}
                  {isFirstSlot && " - "}
                  {isFirstSlot &&
                    format(event.end, is24HourFormat ? "HH:mm" : "h:mm a")}
                </span>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-[59rem]">
      <div className="flex-1 relative">
        {timeSlots}
        <div
          className="absolute z-30 top-0 left-0 w-full h-0.5 bg-green-500"
          style={{
            top: `${
              (getHours(currentDate) - minTime) * 64 +
              (getMinutes(currentDate) / 60) * 64
            }px`,
          }}
        />
      </div>
    </div>
  );
};

export default DayView;
