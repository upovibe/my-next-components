import React from 'react';

interface LabelProps {
  text: string;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block text-soft dark:text-pale">
      {text}
    </label>
  );
};

export default Label;
