"use client";

import React, { useState, useEffect } from "react";
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  addDays,
  subDays,
} from "date-fns";
import CalendarHeader from "@/components/form/calender/megacalender/CalendarHeader";
import YearView from "@/components/form/calender/megacalender/YearView";
import MonthView from "@/components/form/calender/megacalender/MonthView";
import WeekView from "@/components/form/calender/megacalender/WeekView";
import DayView from "@/components/form/calender/megacalender/DayView";
import AgendaView from "@/components/form/calender/megacalender/AgendaView";

// Export the Event interface
export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}

interface MegaCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  selectedDate: Date;
  viewType: "month" | "week" | "day" | "agenda" | "year";
  onViewChange: (view: "month" | "week" | "day" | "agenda" | "year") => void;
  locale?: "en" | "fr" | "es";
  minTime?: number;
  maxTime?: number;
  startDay?: number;
  endDay?: number;
  showSwitchHourFormat?: boolean;
  showTodayButton?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

const MegaCalendar: React.FC<MegaCalendarProps> = ({
  events,
  onEventClick,
  onDateClick,
  selectedDate,
  viewType,
  onViewChange,
  locale = "en",
  minTime = 0,
  maxTime = 24,
  startDay,
  endDay,
  showSwitchHourFormat,
  showTodayButton,
  title = "Calendar",
  icon,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [is24HourFormat, setIs24HourFormat] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTimeFormat = () => {
    setIs24HourFormat(!is24HourFormat);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const switchToAgendaView = (date: Date) => {
    setCurrentDate(date);
    onViewChange("agenda");
  };


  const nextPeriod = () => {
    switch (viewType) {
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(addYears(currentDate, 1));
        break;
      case "agenda":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const prevPeriod = () => {
    switch (viewType) {
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(subYears(currentDate, 1));
        break;
      case "agenda":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const handleDateClick = (date: Date) => {
    onDateClick(date);
    setSearchValue("");
  };

  return (
    <div className="p-4 min-w-full overflow-auto overflow-y-hidden">
      <CalendarHeader
        currentDate={currentDate}
        viewType={viewType}
        onViewChange={onViewChange}
        onTodayClick={handleTodayClick}
        toggleTimeFormat={toggleTimeFormat}
        is24HourFormat={is24HourFormat}
        prevPeriod={prevPeriod}
        nextPeriod={nextPeriod}
        locale={locale}
        showSwitchHourFormat={showSwitchHourFormat}
        showTodayButton={showTodayButton}
        title={title}
        icon={icon}
      />

      {viewType === "year" && (
        <YearView
          currentDate={currentDate}
          events={events}
          onYearClick={(year) => setCurrentDate(new Date(year, 0, 1))}
          onEventClick={onEventClick}
          onDateClick={handleDateClick}
        />
      )}

      {viewType === "month" && (
        <MonthView
          currentDate={currentDate}
          events={events}
          is24HourFormat={is24HourFormat}
          onEventClick={onEventClick}
          onDateClick={onDateClick}
          onExtraEventClick={switchToAgendaView}
        />
      )}
      {viewType === "week" && (
        <WeekView
          currentDate={currentDate}
          events={events}
          onEventClick={onEventClick}
          onDateClick={onDateClick}
          minTime={minTime}
          maxTime={maxTime}
          is24HourFormat={is24HourFormat}
          startDay={startDay}
          endDay={endDay}
        />
      )}

      {viewType === "day" && (
        <DayView
          currentDate={currentDate}
          minTime={minTime}
          maxTime={maxTime}
          is24HourFormat={is24HourFormat}
          events={events}
          onEventClick={onEventClick}
        />
      )}
      {viewType === "agenda" && (
        <AgendaView
        currentDate={currentDate}
        events={events}
        is24HourFormat={is24HourFormat}
        onEventClick={onEventClick}
        onDateClick={handleDateClick}
        />
      )}
    </div>
  );
};

export default MegaCalendar;
