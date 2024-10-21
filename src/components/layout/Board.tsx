"use client"; 

import React from 'react'
import { FaHome, FaUser, FaCog, FaBell, FaUserCircle } from 'react-icons/fa';
import SideMenu from "@/components/navigations/SideMenu"

type BoardProps = {
  children: ReactNode;
};

const Board = ({ children }: BoardProps) => {

  const actions = (
    <>
      <FaBell className="text-2xl" />
      <FaUserCircle className="text-3xl" />
      <span>Username</span>
    </>
  );

  const menuItems = [
    { icon: <FaHome />, label: 'Home', link: '/' },
    // <hr key="divider" className="border-gray-500" />, // Divider as an HTML element
    // <div key="custom-text" className="text-gray-300">Custom Text</div>, // Custom text
    { icon: <FaUser />, label: 'Profile', link: '/profile' },
    { icon: <FaCog />, label: 'Settings', link: '/settings' },
  ];

  return (
    <SideMenu items={menuItems} actions={actions}>{children}</SideMenu>
  );
};

export default Board;