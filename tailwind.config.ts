import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors (default)
        'primary': '#f9f9f9',         // Primary background
        'secondary': '#f0f0f0',       // Secondary background
        'tertiary': '#e0e0e0',        // Tertiary background (panels, cards)
        'gold': '#b8860b',            // Dark accent (buttons, links, golden)
        'highlight': '#1e90ff',       // Highlight color (active items)
        'alert': '#ff6347',           // Alert messages, errors
        'border': '#dcdcdc',          // Light border color
        'deep': '#333333',            // Deep text color
        'soft': '#666666',            // Soft text color
        'muted': '#999999',           // Muted text color

        // Dark theme colors (using distinct single-word names)
        'shade': '#1a1a1a',           // Dark primary background
        'dim': '#2a2a2a',             // Dark secondary background
        'shadow': '#3a3a3a',          // Dark tertiary background
        'accent': '#ffd700',          // Accent color (buttons, links, yellow)
        'ocean': '#104e8b',           // Dark highlight color (active items)
        'crimson': '#8b0000',         // Dark alert (error messages)
        'coal': '#4a4a4a',            // Dark border color
        'light': '#f5f5f5',           // Light text in dark mode
        'pale': '#cccccc',            // Soft text in dark mode
        'faint': '#666666',           // Muted text in dark mode
      },
      animation: {
        shiny: 'shiny 1.5s infinite linear', // Adding shiny animation
      },
      keyframes: {
        shiny: {
          '0%': { backgroundPosition: '200%' }, // Start position          
          '50%': {backgroundpostion: '0%'},
          '100%': { backgroundPosition: '-200%' }, // End position
        },
      },
    },
  },
  plugins: [],
};

export default config;
