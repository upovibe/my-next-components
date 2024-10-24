// List of colors to exclude from being generated
const excludedColors = [
  '#f9f9f9', '#f0f0f0', '#e0e0e0', '#b8860b', '#1e90ff', '#ff6347', '#dcdcdc', 
  '#333333', '#666666', '#999999', '#1a1a1a', '#2a2a2a', '#3a3a3a', '#ffd700', 
  '#104e8b', '#8b0000', '#4a4a4a', '#f5f5f5', '#cccccc', '#666666', 'black', 'white'
];

// Helper function to check if a color is excluded
const isExcludedColor = (color: string): boolean => {
  return excludedColors.includes(color.toLowerCase());
};

// Generates a random hex color code (any color) excluding specific colors
export const getRandomColor = (): string => {
  let color;
  do {
    const letters = '0123456789ABCDEF';
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (isExcludedColor(color));
  return color;
};

// Generates a random light hex color code excluding specific colors
export const getRandomLightColor = (): string => {
  let color;
  do {
    const letters = 'CDEF'; // Restrict to lighter hex digits
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
  } while (isExcludedColor(color));
  return color;
};

// Generates an array of random colors excluding specific colors
export const getRandomColors = (count: number): string[] => {
  return Array.from({ length: count }, () => getRandomColor());
};

// Generates an array of random light colors excluding specific colors
export const getRandomLightColors = (count: number): string[] => {
  return Array.from({ length: count }, () => getRandomLightColor());
};
