"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import SwitchButton from '@/components/buttons/SwitchButton';

const ThemeSwitcher = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`mx-auto ${className}`}>
      <SwitchButton
        onClick={toggleTheme}
        isToggled={theme === 'dark'}
        iconTrue={<FaSun className='hover:scale-110 transition-all duration-200 ease-linear'/>}
        iconFalse={<FaMoon className='hover:scale-110 transition-all duration-200 ease-linear'/>}
        showIconOnly
      />
    </div>
  );
};

export default ThemeSwitcher;
