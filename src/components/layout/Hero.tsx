"use client";

import React  from 'react';
import { FaHome, FaUser, FaCog, FaBell, FaUserCircle } from 'react-icons/fa';
import SideMenu from '../navigations/SideMenu';

const Hero = () => {

  const menuItems = [
    { icon: <FaHome />, label: 'Home', link: '/' },
    // <hr key="divider" className="border-gray-500" />, // Divider as an HTML element
    // <div key="custom-text" className="text-gray-300">Custom Text</div>, // Custom text
    { icon: <FaUser />, label: 'Profile', link: '/profile' },
    { icon: <FaCog />, label: 'Settings', link: '/settings' },
  ];

  const actions = (
    <>
      <FaBell className="text-2xl" />
      <FaUserCircle className="text-3xl" />
      <span>Username</span>
    </>
  );

  return (
    <>
     <SideMenu  items={menuItems} actions={actions}>
      <h1 className="text-2xl font-bold">Main Content</h1>
      <p>This is the main content area of the page.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in ut ullam a. Id omnis ab fugit repudiandae rerum, ipsum recusandae harum, necessitatibus, qui cum totam dignissimos ipsam similique asperiores.</p>
    </SideMenu>
    </>
  );
};

export default Hero;
