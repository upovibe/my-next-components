import React, { ReactNode, useEffect, useState } from "react";
import { truncateText } from "@/utils/formatTexts";
import { getRandomColor, getRandomLightColor } from "@/utils/colorUtils";

interface MessageProps {
  title: string;
  content: string;
  timer?: string;
  template?: ReactNode;
  className?: string;
  borderColor?: boolean;
  bgColor?: boolean;
}

const Message: React.FC<MessageProps> = ({
  title,
  content,
  timer,
  template,
  className,
  borderColor = true,
  bgColor,
}) => {
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const [truncatedContent, setTruncatedContent] = useState(content);
  const [borderClr, setBorderClr] = useState<string>('');
  const [backgroundClr, setBackgroundClr] = useState<string>('');

  // Generate random colors on mount
  useEffect(() => {
    if (borderColor) {
      setBorderClr(getRandomColor());
    }
    if (bgColor) {
      setBackgroundClr(getRandomLightColor());
    }
  }, [borderColor, bgColor]);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth > 768 ? 400 : 200;
      const fontSize = 16;

      setTruncatedTitle(truncateText(title, maxWidth, fontSize));
      setTruncatedContent(truncateText(content, maxWidth, fontSize));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [title, content]);

  return (
    <div
      className={`flex items-center gap-3 w-full p-3 px-4 rounded-md border-l-4 bg-secondary dark:bg-dim ${className}`}
      style={{
        borderColor: borderColor ? borderClr : undefined,
        backgroundColor: bgColor ? backgroundClr : undefined,
      }}
    >
      {template && <div className="flex-shrink-0">{template}</div>}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <h1
            className={` ${
              bgColor ? "text-deep dark:text-deep" : "dark:text-light text-deep"
            } font-bold text-lg`}
          >
            {truncatedTitle}
          </h1>
          {timer && (
            <span
              className={`text-sm  ${
                bgColor ? "text-faint dark:text-faint" : "dark:text-muted text-faint"
              }`}
            >
              {timer}
            </span>
          )}
        </div>
        <div>
          <p
            className={`${
              bgColor ? "text-deep/70 dark:text-deep/70" : "dark:text-light text-deep font "
            }`}
          >
            {truncatedContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
