"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import SwitchButton from '@/components/form/buttons/SwitchButton';

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

  const iconClass = "hover:scale-110 transition-all duration-200 ease-linear";

  return (
    <div className={className}>
      <SwitchButton
        onClick={toggleTheme}
        isToggled={theme === 'dark'}
        iconTrue={FaSun}
        iconFalse={FaMoon}
        textTrue="Light"
        textFalse="Dark"
        iconPosition="left"
        iconClass={iconClass}
        className='flex'
      />
    </div>
  );
};

export default ThemeSwitcher;
