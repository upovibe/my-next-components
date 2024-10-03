"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

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

  const iconClass = "text-md hover:scale-110 transition-all duration-200 ease-linear";

  return (
    <div className={className}>
      <button onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === 'light' ? (
          <FaMoon className={`text-highlight ${iconClass}`} />
        ) : (
          <FaSun className={`text-ocean ${iconClass}`} />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
