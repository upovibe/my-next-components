// utils.ts
export const truncateText = (
  text: string,
  maxWidth: number,
  fontSize: number = 16,
  fontFamily: string = "Arial"
): string => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return text;
  }
  context.font = `${fontSize}px ${fontFamily}`;

  const measureTextWidth = (str: string): number => {
    return context.measureText(str).width;
  };

  if (measureTextWidth(text) <= maxWidth) {
    return text;
  }

  let truncatedText = text;
  while (
    measureTextWidth(truncatedText + "...") > maxWidth &&
    truncatedText.length > 0
  ) {
    truncatedText = truncatedText.slice(0, -1);
  }

  return truncatedText + "...";
};


// utils/separateWords.ts
export const separateWords = (input: string): string => {
  return input
    .split(',')
    .map((word) => word.trim())
    .join(', ');
};
