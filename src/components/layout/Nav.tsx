"use client"; // This tells Next.js that this component is client-side

import React, { useState } from "react";
import Link from "next/link";
import Logo from '@/components/common/Logo';
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center flex-wrap p-2 bg-primary dark:bg-shade shadow-md">
      <div className="mr-auto">
        <Logo />
      </div>

      {/* Burger Menu */}
      <div className="burger-menu flex md:hidden cursor-pointer flex-col space-y-1 ml-3" onClick={toggleMenu}>
        <div className={`w-6 h-[2px] bg-deep dark:bg-light transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
        <div className={`w-6 h-[2px] bg-deep dark:bg-light transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-[2px] bg-deep dark:bg-light transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </div>

      {/* Main Nav Menu */}
      <div className={`md:flex md:space-x-4 md:space-y-0 md:w-auto space-y-2 w-full bg-primary dark:bg-shade mt-2 border-t-2 py-4 border-muted/50 md:m-0 md:p-0 md:border-none ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center`} data-name="nav-menu">
        <div className="flex flex-col md:flex-row">
          <Link href="#" className="font-light text-deep dark:text-light hover:text-highlight dark:hover:text-ocean md:px-4 uppercase py-2 px-0">Home</Link>
        </div>
        <ThemeSwitcher/>
        <Link href="#" className="bg-gold dark:bg-accentgold font-light inline-block px-5 py-2 rounded text-light uppercase">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Nav;
