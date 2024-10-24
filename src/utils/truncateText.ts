// utils.ts
export const truncateText = (text: string, maxWidth: number, fontSize: number = 16, fontFamily: string = 'Arial'): string => {
    // Create a temporary canvas to measure text width
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    if (!context) {
      return text; // Return the original text if context is not available
    }
  
    // Set the font properties
    context.font = `${fontSize}px ${fontFamily}`;
  
    // Measure the width of the text
    const measureTextWidth = (str: string): number => {
      return context.measureText(str).width;
    };
  
    // If the text is already within the maximum width, return it as-is
    if (measureTextWidth(text) <= maxWidth) {
      return text;
    }
  
    // Truncate the text progressively, appending "..." until it fits
    let truncatedText = text;
    while (measureTextWidth(truncatedText + '...') > maxWidth && truncatedText.length > 0) {
      truncatedText = truncatedText.slice(0, -1);
    }
  
    return truncatedText + '...';
  };
  