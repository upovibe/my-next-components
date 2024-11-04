"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import SelectInput from "@/components/inputs/SelectInput";

const getMonthDays = (
  year: number,
  month: number,
  firstDayOfWeek: number = 0
) => {
  const days = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedStartDay = (firstDayOfMonth - firstDayOfWeek + 7) % 7;
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = adjustedStartDay;
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  for (let i = prevMonthDays; i > 0; i--) {
    days.push({
      date: new Date(year, month - 1, lastDateOfPrevMonth - i + 1),
      currentMonth: false,
    });
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({ date: new Date(year, month, i), currentMonth: true });
  }

  const remainingDays = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ date: new Date(year, month + 1, i), currentMonth: false });
  }

  return days;
};

interface CalendarInputProps {
  locale?: string;
  name?: string;
  firstDayOfWeek?: number;
  minDate?: Date;
  maxDate?: Date;
  selectionMode?: "single" | "range" | "multiple" | "year" | "month";
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: "12" | "24";
  showButtonBar?: boolean;
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  showCalendarByDefault?: boolean;
  className?: string;
  onDateChange?: (date: Date | Date[] | null) => void;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  locale = "en-US",
  name,
  firstDayOfWeek = 0,
  minDate,
  maxDate,
  selectionMode = "single",
  showTime,
  timeOnly,
  hourFormat = "24",
  showButtonBar,
  placeholder,
  label,
  floatingLabel,
  hidePlaceholder,
  disabled,
  size = "nm",
  showCalendarByDefault,
  className = "",
  onDateChange,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date | Date[] | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [showCalendar, setShowCalendar] = useState(showCalendarByDefault);
  const [time, setTime] = useState({ hours: 0, minutes: 0, ampm: "AM" });

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !calendarRef.current ||
        calendarRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (!showCalendarByDefault && showCalendar) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar, showCalendarByDefault]);

  const localizedDaysOfWeek = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(Date.UTC(2021, 5, i + firstDayOfWeek))
    )
  );

  const monthDays = getMonthDays(currentYear, currentMonth, firstDayOfWeek);

  const handleDateClick = (date: Date) => {
    if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;
    if (selectionMode === "single") {
      setSelectedDates(date);
      onDateChange?.(date); // Call onDateChange if it exists
      if (!showCalendar) setShowCalendar(false);
    } else if (selectionMode === "multiple") {
      setSelectedDates((prevDates) => {
        const newDates = Array.isArray(prevDates) ? [...prevDates] : [];
        const index = newDates.findIndex(
          (d) => d.toDateString() === date.toDateString()
        );
        if (index === -1) {
          newDates.push(date);
        } else {
          newDates.splice(index, 1);
        }
        onDateChange?.(newDates); // Call onDateChange with updated dates
        return newDates;
      });
    } else if (selectionMode === "range") {
      setSelectedDates((prevDates) => {
        if (!Array.isArray(prevDates) || prevDates.length === 0) {
          onDateChange?.([date]);
          return [date];
        } else if (prevDates.length === 1) {
          const sortedDates = [prevDates[0], date].sort(
            (a, b) => a.getTime() - b.getTime()
          );
          onDateChange?.(sortedDates);
          return sortedDates;
        }
        onDateChange?.([date]);
        return [date];
      });
    }
  };

  // Calculate year range based on minDate and maxDate
  const getYearRange = () => {
    const startYear = minDate ? minDate.getFullYear() : 1900;
    const endYear = maxDate ? maxDate.getFullYear() : 2100;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setSelectedDates(new Date(year, currentMonth, 1));
  };

  const handleMonthChange = (newMonth: number) => setCurrentMonth(newMonth);
  const handleYearChange = (newYear: number) => setCurrentYear(newYear);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: parseInt(value) });
  };

  const handleToggleAMPM = () => {
    setTime((prevTime) => ({
      ...prevTime,
      ampm: prevTime.ampm === "AM" ? "PM" : "AM",
    }));
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDates(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setShowCalendar(false);
  };

  const handleClear = () => {
    setSelectedDates(null);
    setShowCalendar(false);
  };

  const formatDateTime = () => {
    if (!selectedDates) return "";

    if (selectionMode === "year") {
      return `${(selectedDates as Date).getFullYear()}`;
    }

    if (selectionMode === "month") {
      return `${(selectedDates as Date).getMonth() + 1}/${(
        selectedDates as Date
      ).getFullYear()}`;
    }

    const datePart = Array.isArray(selectedDates)
      ? selectedDates.map((d) => d.toLocaleDateString(locale)).join(", ")
      : selectedDates?.toLocaleDateString(locale);

    if (!showTime) {
      return datePart;
    }

    // Formatting time if showTime is enabled
    const timePart = `${time.hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}`;

    if (hourFormat === "12") {
      return `${datePart} ${timePart} ${time.ampm}`;
    }

    return `${datePart} ${timePart}`;
  };

  const formatTime = () => {
    if (!showTime) return "";

    const timePart = `${time.hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}`;

    if (hourFormat === "12") {
      return `${timePart} ${time.ampm}`;
    }

    return timePart;
  };

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative w-full" ref={calendarRef}>
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={timeOnly ? formatTime() : formatDateTime()}
        placeholder={timeOnly ? "Select Time" : "Select Date"}
        readOnly
        disabled={disabled}
        onClick={() => {
          if (!showCalendarByDefault) {
            setShowCalendar((prev) => !prev);
          }
        }}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          hidePlaceholder || floatingLabel
            ? "placeholder-transparent"
            : "placeholder-soft dark:placeholder-pale"
        } ${sizeClass} ${className} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      />

      {floatingLabel && (
        <label
          className={`absolute left-[1rem] transition-all duration-200 text-soft dark:text-pale cursor-text ${
            (timeOnly ? formatTime() : formatDateTime())
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-1/2 transform -translate-y-1/2 text-base"
          }`}
        >
          {placeholder}
        </label>
      )}

      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {showTime ? <FaClock /> : <FaCalendarAlt />}
      </span>

      {showCalendar && (
        <div
          className={`mt-2 bg-primary dark:bg-shade rounded-lg p-4 z-50 w-full shadow-xl animate-bounceInDown ${
            showCalendarByDefault ? "relative" : "absolute top-full left-0 "
          }`}
        >
          {!timeOnly && selectionMode === "year" && (
            <div className="flex justify-between mb-2 border-border dark:border-coal border-b-2 p-2">
              <button
                type="button"
                aria-label="Previous Year"
                className="flex items-center rounded-full justify-center size-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
                onClick={() => setCurrentYear(currentYear - 1)}
              >
                <FaChevronLeft />
              </button>
              <div className="flex items-center flex-col gap-1">
                <span className="whitespace-nowrap">{currentYear}</span>
                <SelectInput
                  placeholder="Select a year"
                  options={getYearRange().map((year) => year.toString())}
                  value={currentYear.toString()}
                  onChange={(selectedValue) =>
                    handleYearSelect(Number(selectedValue))
                  }
                  size="sm"
                />
              </div>
              <button
                type="button"
                aria-label="Next Year"
                className="flex items-center rounded-full justify-center size-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
                onClick={() => setCurrentYear(currentYear + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {!timeOnly && selectionMode === "year" && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`p-2 rounded ${
                    currentYear - 5 + i === currentYear
                      ? "bg-highlight dark:bg-ocean text-blue-600 font-extrabold"
                      : "hover:bg-highlight/50 dark:hover:bg-ocean/50"
                  }`}
                  onClick={() => {
                    handleYearChange(currentYear - 5 + i);
                    setSelectedDates(new Date(currentYear - 5 + i, 0, 1));
                    setShowCalendar(false);
                  }}
                >
                  {currentYear - 5 + i}
                </button>
              ))}
            </div>
          )}

          {!timeOnly && selectionMode === "month" && (
            <div>
              <div className="flex justify-between mb-2 border-border dark:border-coal border-b-2 pb-2">
                <button
                  type="button"
                  aria-label="Previous Year"
                  className="flex items-center rounded-full justify-center size-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
                  onClick={() => setCurrentYear(currentYear - 1)}
                >
                  <FaChevronLeft />
                </button>
                <div className="flex items-center flex-col gap-1">
                  <span className="whitespace-nowrap">{currentYear}</span>
                  <SelectInput
                    placeholder="Select a year"
                    options={getYearRange().map((year) => year.toString())}
                    value={currentYear.toString()}
                    onChange={(selectedValue) =>
                      handleYearSelect(Number(selectedValue))
                    }
                    size="sm"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Next Year"
                  className="flex items-center rounded-full justify-center size-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
                  onClick={() => setCurrentYear(currentYear + 1)}
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`p-2 rounded ${
                      i === currentMonth
                        ? "bg-highlight dark:bg-ocean text-blue-600 font-extrabold"
                        : "hover:bg-highlight/50 hover:dark:bg-ocean/50"
                    }`}
                    onClick={() => {
                      handleMonthChange(i);
                      setSelectedDates(new Date(currentYear, i, 1));
                      setShowCalendar(false);
                    }}
                  >
                    {new Date(currentYear, i).toLocaleString(locale, {
                      month: "short",
                    })}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!timeOnly &&
            selectionMode !== "year" &&
            selectionMode !== "month" && (
              <div>
                <div className="flex justify-between mb-2 border-border dark:border-coal border-b-2 pb-3">
                  <button
                    type="button"
                    aria-label="Previous Month"
                    className="flex items-center rounded-full justify-center size-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
                    onClick={() => handleMonthChange(currentMonth - 1)}
                  >
                    <FaChevronLeft />
                  </button>
                  <div className="flex items-center flex-col gap-1">
                    <span className="whitespace-nowrap">
                      {new Date(currentYear, currentMonth).toLocaleString(
                        locale,
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <div className="flex justify-between mb-2">
                      <SelectInput
                        placeholder="Select a year"
                        options={getYearRange().map((year) => year.toString())}
                        value={currentYear.toString()}
                        onChange={(selectedValue) =>
                          handleYearSelect(Number(selectedValue))
                        }
                        size="sm"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Next Month"
                    className="flex items-center rounded-full justify-center size-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
                    onClick={() => handleMonthChange(currentMonth + 1)}
                  >
                    <FaChevronRight />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm font-bold py-2">
                  {localizedDaysOfWeek.map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {monthDays.map(({ date, currentMonth }, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`p-2 rounded ${
                        currentMonth
                          ? "bg-primary dark:bg-shade"
                          : "bg-tertiary dark:bg-shadow"
                      } ${
                        selectedDates &&
                        ((Array.isArray(selectedDates) &&
                          selectedDates.some(
                            (d) => d.toDateString() === date.toDateString()
                          )) ||
                          (!Array.isArray(selectedDates) &&
                            selectedDates.toDateString() ===
                              date.toDateString()))
                          ? "bg-blue-500 dark:bg-blue-900 text-blue-600 font-extrabold"
                          : "hover:bg-highlight/50 hover:dark:bg-ocean/50"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {showTime && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="number"
                  name="hours"
                  aria-label="Hours"
                  className="w-16 py-2 px-3 text-center rounded-md border-2 border-border dark:border-coal bg-primary dark:bg-shade cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                  value={time.hours}
                  onChange={handleTimeChange}
                  min={hourFormat === "24" ? 0 : 1}
                  max={hourFormat === "24" ? 23 : 12}
                />
                <span>:</span>
                <input
                  type="number"
                  name="minutes"
                  aria-label="Minutes"
                  className="w-16 py-2 px-3 text-center rounded-md border-2 border-border dark:border-coal bg-primary dark:bg-shade cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                  value={time.minutes}
                  onChange={handleTimeChange}
                  min={0}
                  max={59}
                />
                {hourFormat === "12" && (
                  <button
                    type="button"
                    aria-label={`Switch to ${time.ampm === "AM" ? "PM" : "AM"}`}
                    className="px-3 py-2 border-2 border-border dark:border-coal bg-primary dark:bg-shade rounded"
                    onClick={handleToggleAMPM}
                  >
                    {time.ampm}
                  </button>
                )}
              </div>
            </div>
          )}

          {showButtonBar && (
            <div className="flex justify-between mt-4">
              <button
                type="button"
                aria-label="Today"
                className="px-4 py-2 bg-highlight dark:bg-ocean text-white rounded"
                onClick={handleToday}
              >
                Today
              </button>
              <button
                type="button"
                aria-label="Clear Selection"
                className="px-4 py-2 bg-soft dark:bg-gray-700 rounded"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
