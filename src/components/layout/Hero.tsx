'use client';

import React from 'react';
import { FaHome, FaInfo, FaPhone, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import NavMenu from '../navugations/NavMenu';

const Hero: React.FC = () => {
  const menuItems = [
    { label: 'Home', href: '/', icon: FaHome },
    { label: 'About', href: '/about', icon: FaInfo },
    { label: 'Services', icon: FaUserAlt, children: [
      { label: 'Web Development', href: '/services/web' },
      { label: 'Mobile Development', href: '/services/mobile' },
    ]},
    { label: 'Contact', href: '/contact', icon: FaPhone, command: () => alert('Contact clicked!') }
  ];

  const logo = <img src="/logo.png" alt="Logo" className="h-8" />;

  const searchInput = (
    <input
      type="text"
      placeholder="Search"
      className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
    />
  );

  const signInButton = (
    <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
      <FaSignInAlt className="inline-block mr-1" /> Sign In
    </button>
  );

  return (
    <div className="p-4">
      <NavMenu
        logo={logo}
        items={menuItems}
        input={searchInput}
        button={signInButton}
        container={true} // Toggle to true for container layout
        widthClass="max-w-full" // Adjust the width as needed
        itemsOnLeft={false}
        displayType="dropdown" // Place items on the right (next to the button)
      />
    </div>
  );
};

export default Hero;
