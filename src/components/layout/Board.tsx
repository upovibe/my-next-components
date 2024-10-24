"use client";

import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBell,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaFileAlt,
  FaPenFancy,
  FaClipboardList,
  FaCalendarAlt,
  FaBullhorn,
  FaUserGraduate,
  FaCalendarCheck,
} from "react-icons/fa";
import SideMenu from "@/components/navigations/SideMenu";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import SearchInput from "@/components/form/inputs/SearchInput";
import Divider from "@/components/common/Divider";
import Menu from "@/components/navigations/Menu";

type BoardProps = {
  children: React.ReactNode;
};

const Board = ({ children }: BoardProps) => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  // Handle logout function
  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  // Define menu items for the dropdown, with some Next links and a custom element
  const MenuItems = [
    { label: "Profile", icon: <FaUser />, url: "/profile" },
    { label: "Settings", icon: <FaCog />, url: "/settings" },
    { label: "Notifications", icon: <FaBell />, url: "/notifications" },
    <Divider key="divider" layout="horizontal" type="solid" className="my-2" />,
    <ThemeSwitcher
      key="theme-switcher"
      className="w-full hover:bg-gray-200 hover:dark:bg-dim rounded-md"
    />,
    { label: "Logout", icon: <FaSignOutAlt />, onClick: handleLogout },
  ];

  const actions = (
    <div className="flex gap-4 items-center justify-between">
      <div className="flex">
        <SearchInput
          placeholder="Search..."
          showButton
          onSearch={handleSearch}
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <FaEnvelope className="text-soft dark:text-pale font-semibold text-lg" />
          <Badge
            text="2"
            size="xs"
            className="absolute -top-4 -right-3 border border-border dark:border-coal rounded-full bg-red-500 text-light font-semibold"
          />
        </div>
        <div className="relative mr-3">
          <FaBell className="text-soft dark:text-pale font-semibold text-lg" />
          <Badge
            text="3"
            size="xs"
            className="absolute -top-4 -right-3 border border-border dark:border-coal rounded-full bg-blue-500 text-light font-semibold"
          />
        </div>
        <div className="flex flex-col items-end justify-end leading-tight">
          <div className="text-sm font-bold leading-none">John Doe</div>
          <span className="text-xs text-soft dark:text-pale font-semibold">
            Admin
          </span>
        </div>
        <Menu
          trigger={
            <Avatar
              src="/images/avatar.png"
              alt="User Avatar"
              initials="AB"
              size="sm"
              color="bg-blue-500"
              shape="circle"
              className="border-4 border-border dark:border-coal cursor-pointer"
            />
          }
          items={MenuItems}
        />
      </div>
    </div>
  );

  // Define menu items
  const SideMenuItems = [
    <Divider
      key="divider"
      align="center"
      layout="horizontal"
      type="solid"
      className="my-3"
    >
      MENU
    </Divider>,
    { icon: <FaHome />, label: "Home", link: "/" },
    { icon: <FaChalkboardTeacher />, label: "Teacher", link: "/teacher" },
    { icon: <FaUserGraduate />, label: "Student", link: "/student" },
    { icon: <FaUsers />, label: "Parents", link: "/parents" },
    { icon: <FaBook />, label: "Classes", link: "/classes" },
    { icon: <FaFileAlt />, label: "Lessons", link: "/lessons" },
    { icon: <FaPenFancy />, label: "Exams", link: "/exams" },
    { icon: <FaClipboardList />, label: "Assignments", link: "/assignments" },
    { icon: <FaCalendarCheck />, label: "Attendance", link: "/attendance" },
    { icon: <FaCalendarAlt />, label: "Events", link: "/events" },
    { icon: <FaEnvelope />, label: "Messages", link: "/messages" },
    { icon: <FaBullhorn />, label: "Announcement", link: "/announcement" },
    <Divider
      key="divider"
      align="center"
      layout="horizontal"
      type="solid"
      className="my-3"
    >
      OTHERS
    </Divider>,
    { icon: <FaUserCircle />, label: "Profile", link: "/profile" },
    { icon: <FaCog />, label: "Settings", link: "/settings" },
    { icon: <FaSignOutAlt />, label: "Logout", onClick: handleLogout },
  ];

  return (
    <SideMenu items={SideMenuItems} actions={actions}>
      <div className="p-3">{children}</div>
    </SideMenu>
  );
};

export default Board;
