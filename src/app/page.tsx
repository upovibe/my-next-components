"use client";

import React, { useState } from "react";
import  {FaCalendar} from "react-icons/fa"
import MegaCalender from "@/components/form/calender/MegaCalender";

const Page = () => {
  // Example event data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting with Bob",
      start: new Date("2024-10-24T06:00:00"),
      end: new Date("2024-10-24T07:00:00"),
      description: "Discuss project progress",
      color: "red",
    },
    {
      id: 2,
      title: "Lunch with Sarah",
      start: new Date("2024-10-26T12:00:00"),
      end: new Date("2024-10-26T14:50:00"),
      description: "Catch up over lunch",
      color: "green",
    },
    {
      id: 3,
      title: "Conference Call",
      start: new Date("2024-10-26T15:00:00"),
      end: new Date("2024-10-26T16:00:00"),
      description: "Weekly sync with the team",
      color: "brown",
    },
    {
      id: 4,
      title: "Doctor Appointment",
      start: new Date("2024-10-24T08:00:00"),
      end: new Date("2024-10-24T09:00:00"),
      description: "Routine check-up",
      color: "blue",
    },
    {
      id: 5,
      title: "Project Deadline",
      start: new Date("2024-10-24T10:00:00"),
      end: new Date("2024-10-24T11:00:00"),
      description: "Final project submission",
      color: "purple",
    },
    {
      id: 6,
      title: "Team Lunch",
      start: new Date("2024-10-26T10:00:00"),
      end: new Date("2024-10-26T11:00:00"),
      description: "Team bonding session",
      color: "orange",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<
    "month" | "week" | "day" | "agenda" | "year"
  >("day");

  const handleEventClick = (event: any) => {
    alert(`Event clicked: ${event.title}`);
  };

  const handleDateClick = (date: Date) => {
    alert(`Date clicked: ${date.toLocaleDateString()}`);
  };

  const handleViewChange = (
    view: "month" | "week" | "day" | "agenda" | "year"
  ) => {
    setViewType(view);
  };

  return (
    <>
      <MegaCalender
        events={events}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        viewType={viewType}
        onViewChange={handleViewChange}
        minTime={2}
        maxTime={16}
        startDay={0}
        endDay={6}
        title="TimeTable"
        icon={<FaCalendar />}
      />
    </>
  );
};

export default Page;
