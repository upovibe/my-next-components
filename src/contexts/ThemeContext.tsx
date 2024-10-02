import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';  // Import ThemeProvider from your theme library

interface UseThemeProps {
  children?: ReactNode; // Allow children to be optional
}

export function UseTheme({ children }: UseThemeProps = {}) {  
  // console.log('Children passed to UseTheme:', children);

  if (!children) {
    console.error('No children provided to UseTheme component.');
    return null;  // Return null if no children are passed
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children} {/* Safely render children */}
    </ThemeProvider>
  );
}
