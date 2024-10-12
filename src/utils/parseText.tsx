// utils/parseText.tsx
import React from "react";

export const parseText = (text: string) => {
  const mentionRegex = /(@\w+)/g;
  const hashtagRegex = /(#\w+)/g;

  const parts = text.split(/(@\w+|#\w+)/g); // Split by @mentions or #hashtags

  return parts.map((part, index) => {
    if (mentionRegex.test(part)) {
      return (
        <a key={index} href={`/${part.slice(1)}`} className="text-deep">
          {part}
        </a>
      );
    } else if (hashtagRegex.test(part)) {
      return (
        <a key={index} href={`/trending/${part.slice(1)}`} className="text-highlight">
          {part}
        </a>
      );
    } else {
      return part;
    }
  });
};
