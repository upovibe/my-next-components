import React from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { enUS, fr, es } from "date-fns/locale";
import SelectButton from "@/components/form/buttons/SelectButton";
import ButtonAction from "@/components/form/buttons/ActionButton";
import SwitchButton from "@/components/form/buttons/SwitchButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: "month" | "week" | "day" | "agenda" | "year";
  onViewChange: (view: "month" | "week" | "day" | "agenda" | "year") => void;
  onTodayClick: () => void;
  toggleTimeFormat: () => void;
  is24HourFormat: boolean;
  prevPeriod: () => void;
  nextPeriod: () => void;
  locale?: "en" | "fr" | "es";
  showSwitchHourFormat?: boolean;
  showTodayButton?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

const localeMap = {
  en: enUS,
  fr: fr,
  es: es,
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewType,
  onViewChange,
  onTodayClick,
  toggleTimeFormat,
  is24HourFormat,
  prevPeriod,
  nextPeriod,
  locale = "en",
  showSwitchHourFormat = true,
  showTodayButton = true,
  title = "Calendar",
  icon,
}) => {
  const startOfWeekDate = startOfWeek(currentDate, {
    locale: localeMap[locale],
  });
  const endOfWeekDate = endOfWeek(currentDate, { locale: localeMap[locale] });

  // Format the header based on view type
  const headerTitle = (() => {
    switch (viewType) {
      case "day":
        return format(currentDate, "EEE MMM d", { locale: localeMap[locale] });
      case "week":
        return `${format(startOfWeekDate, "MMM d", {
          locale: localeMap[locale],
        })} - ${format(endOfWeekDate, "d", { locale: localeMap[locale] })}`;
      case "month":
        return format(currentDate, "MMM yyyy", { locale: localeMap[locale] });
      case "year":
        return format(currentDate, "yyyy", { locale: localeMap[locale] });
      case "agenda":
        return `${format(startOfWeekDate, "MMM d", {
          locale: localeMap[locale],
        })} - ${format(endOfWeekDate, "d", { locale: localeMap[locale] })}`;
      default:
        return "";
    }
  })();

  return (
    <div className="flex items-center justify-between mb-5 min-w-[59rem] bg-primary dark:bg-shade rounded-full py-1 px-3">
      <div className="flex items-center gap-2">
        {showSwitchHourFormat && (
          <SwitchButton
            onClick={toggleTimeFormat}
            isToggled={is24HourFormat}
            textTrue="12-hour"
            textFalse="24-hour"
            className="flex items-center rounded-full whitespace-nowrap justify-center size-8 font-semibold text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
            showTextOnly
          />
        )}
        {showTodayButton && (
          <ButtonAction
            onClick={onTodayClick}
            hideTextOnLoading
            className="flex items-center rounded-full justify-center font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
          >
            Today
          </ButtonAction>
        )}
      </div>

      <div className="flex items-center gap-2 justify-center">
        <button
          type="button"
          aria-label="Previous Date"
          onClick={prevPeriod}
          className="flex items-center rounded-full justify-center w-8 h-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
        >
          <FaChevronLeft />
        </button>
        <h2 className="flex items-center text-xl whitespace-nowrap text-deep dark:text-light bg-secondary dark:bg-dim p-1 px-3 rounded-full shadow font-bold flex-grow text-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}: {headerTitle}
        </h2>

        <button
          type="button"
          aria-label="Next Date"
          onClick={nextPeriod}
          className="flex items-center rounded-full justify-center w-8 h-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="">
        <SelectButton
          options={["day", "week", "month", "year", "agenda"]}
          value={viewType}
          onChange={(value) =>
            onViewChange(value as "day" | "week" | "month" | "year" | "agenda")
          }
          className="px-3 py-1 rounded-full font-semibold transition-all duration-200 ease-linear cursor-pointer capitalize"
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
