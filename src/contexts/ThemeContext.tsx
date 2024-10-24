"use client";

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

interface UseThemeProps {
  children: ReactNode; 
}

const UseTheme = ({ children }: UseThemeProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default UseTheme;


