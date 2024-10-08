"use client";

import React, { useState, useRef, useEffect } from "react";

// Utility function for month days and localized week days
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
  firstDayOfWeek?: number;
  minDate?: Date;
  maxDate?: Date;
  selectionMode?: "single" | "range" | "multiple" | "year" | "month";
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: "12" | "24";
  showButtonBar?: boolean;
  placeholder: string; // Placeholder text
  label?: string; // Label for non-floating label mode
  floatingLabel?: boolean; // Flag to enable floating label
  hidePlaceholder?: boolean; // Option to hide the placeholder
  disabled?: boolean; // Option to disable the input
  size?: "sm" | "nm" | "lg"; // Size of the input (small, normal, large)
  className?: string; // Additional classes for customization
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  locale = "en-US",
  firstDayOfWeek = 0,
  minDate,
  maxDate,
  selectionMode = "single",
  showTime = false,
  timeOnly = false,
  hourFormat = "24",
  showButtonBar = false,
  placeholder,
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  disabled = false,
  size = "nm",
  className = "",
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, ampm: "AM" });

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const localizedDaysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    .slice(firstDayOfWeek)
    .concat(
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].slice(0, firstDayOfWeek)
    );
  const monthDays = getMonthDays(currentYear, currentMonth, firstDayOfWeek);

  const handleDateClick = (date: Date) => {
    if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;

    if (selectionMode === "single") {
      setSelectedDates(date);
      setShowCalendar(false);
    }
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

  // Function to format date and time for display in the input field
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

  // Function to format only time for display in the input field
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

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm", // Small size
    nm: "p-2 text-base", // Normal size
    lg: "p-3 text-lg", // Large size
  }[size];

  return (
    <div className="relative" ref={calendarRef}>
      {/* If a label is provided and floating label is disabled, show a regular label */}
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}
      <input
        type="text"
        value={timeOnly ? formatTime() : formatDateTime()} // Show time or date-time based on the 'timeOnly' prop
        placeholder={timeOnly ? "Select Time" : "Select Date"}
        readOnly
        disabled={disabled}
        onClick={() => setShowCalendar(!showCalendar)}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          hidePlaceholder || floatingLabel
            ? "placeholder-transparent"
            : "placeholder-soft dark:placeholder-pale"
        } ${sizeClass} ${className} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      />

      {/* If floatingLabel is true, display the floating label */}
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

      <i
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
          showTime ? "far fa-clock" : "far fa-calendar-alt"
        }`}
      />

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-primary dark:bg-shade shadow-lg rounded p-4 z-10">
          {!timeOnly && selectionMode === "year" && (
            <div className="flex justify-between mb-2 border-border dark:border-coal border-b-2 p-2">
              <button
                className="px-2"
                onClick={() => setCurrentYear(currentYear - 1)}
              >
                &lt;
              </button>
              <span>{currentYear}</span>
              <button
                className="px-2"
                onClick={() => setCurrentYear(currentYear + 1)}
              >
                &gt;
              </button>
            </div>
          )}

          {!timeOnly && selectionMode === "year" && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <button
                  key={i}
                  className={`p-2 rounded ${
                    currentYear - 5 + i === currentYear
                      ? "bg-highlight dark:bg-ocean text-light"
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
                  className="px-2"
                  onClick={() => setCurrentYear(currentYear - 1)}
                >
                  &lt;
                </button>
                <span>{currentYear}</span>
                <button
                  className="px-2"
                  onClick={() => setCurrentYear(currentYear + 1)}
                >
                  &gt;
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <button
                    key={i}
                    className={`p-2 rounded ${
                      i === currentMonth
                        ? "bg-highlight dark:bg-ocean text-light"
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
                  <button onClick={() => handleMonthChange(currentMonth - 1)}>
                    &lt;
                  </button>
                  <span>
                    {new Date(currentYear, currentMonth).toLocaleString(
                      locale,
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <button onClick={() => handleMonthChange(currentMonth + 1)}>
                    &gt;
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
                          ? "bg-blue-500 dark:bg-blue-900 text-light"
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
            <div className="mt-4 flex items-center w-full gap-3 justify-center border-t-2 border-border dark:border-coal pt-4 ">
              <input
                type="number"
                name="hours"
                value={time.hours}
                onChange={handleTimeChange}
                className="w-12 text-center border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                min="0"
                max={hourFormat === "24" ? "23" : "12"}
              />
              :
              <input
                type="number"
                name="minutes"
                value={time.minutes}
                onChange={handleTimeChange}
                className="w-12 text-center border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                min="0"
                max="59"
              />
              {hourFormat === "12" && (
                <button
                  onClick={handleToggleAMPM}
                  className="ml-2 rounded px-2 bg-highlight text-light"
                >
                  {time.ampm}
                </button>
              )}
            </div>
          )}

          {showButtonBar && (
            <div className="mt-4 flex justify-end space-x-2 border-t-2 border-border dark:border-coal pt-4">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-tertiary hover:bg-tertiary/90 dark:bg-dim hover:dark:bg-dim/90 transition-all duration-200 ease-linear rounded"
              >
                Clear
              </button>
              <button
                onClick={handleToday}
                className="px-4 py-2 bg-highlight dark:bg-ocean transition-all duration-200 ease-linear hover:bg-highlight/90 dark:hover:bg-ocean/90 text-light rounded"
              >
                Today
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
