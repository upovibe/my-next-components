import React, { useState } from "react";
import { format, startOfWeek, endOfWeek, addDays, isSameDay } from "date-fns";
import SelectInput from "@/components/form/inputs/SelectInput";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}

interface AgendaViewProps {
  currentDate: Date;
  events: Event[];
  is24HourFormat: boolean;
  onEventClick: (event: Event) => void;
}

const AgendaView: React.FC<AgendaViewProps> = ({
  currentDate,
  events,
  is24HourFormat,
  onEventClick,
}) => {
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);
  const [searchValue, setSearchValue] = useState("");
  const options = events.map(event => event.title);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderDayEvents = (day: Date) => {
    const dayEvents = filteredEvents.filter(event => isSameDay(event.start, day));
    return (
      <div key={day.toString()} className="p-4 flex flex-col items-start gap-2 border-b border-border dark:border-coal">
        <div className="font-bold text-deep dark:text-light">
          {format(day, "EEEE, MMMM d")}
        </div>
        <ul className="list-disc list-inside">
          {dayEvents.length > 0 ? (
            dayEvents.map(event => (
              <li
                key={event.id}
                className="font-semibold text-soft dark:text-muted p-1 px-2 mb-2 rounded-full shadow cursor-pointer"
                onClick={() => onEventClick(event)}
                style={{ backgroundColor: event.color }}
              >
                <span className="font-semibold text-light">
                  {event.title}
                </span>{" "}
                -{" "}
                <span className="text-light">
                  {format(event.start, is24HourFormat ? "HH:mm" : "h:mm a")} -{" "}
                  {format(event.end, is24HourFormat ? "HH:mm" : "h:mm a")}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No events</li>
          )}
        </ul>
      </div>
    );
  };
  

  let day = startDate;
  const days = [];
  while (day <= endDate) {
    days.push(renderDayEvents(day));
    day = addDays(day, 1);
  }


  return (
    <div className="w-full min-w-[59rem]">
      <SelectInput
        placeholder="Search events"
        floatingLabel
        options={options}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <div>{days}</div>
    </div>
  );
};

export default AgendaView;