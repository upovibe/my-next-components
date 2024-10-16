import React, { ReactNode, useState, useRef, useCallback } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  mouseTrack?: boolean;
  className?: string; // Corrected this line
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  mouseTrack = false,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (mouseTrack) {
        const tooltipWidth = 150; // Tooltip width
        const tooltipHeight = 40; // Tooltip height

        // Center the tooltip horizontally and vertically above the mouse cursor
        let left = event.clientX - tooltipWidth / 5; // Centered horizontally
        let top = event.clientY - tooltipHeight - 1; // 1px above the mouse

        // Adjust to keep within viewport boundaries
        if (left < 0) left = 0; // Prevent moving out of the left side
        if (left + tooltipWidth > window.innerWidth) {
          left = window.innerWidth - tooltipWidth; // Prevent moving out of the right side
        }
        if (top < 0) {
          top = event.clientY + 10; // Move below the mouse if it goes off the top
        }
        if (top + tooltipHeight > window.innerHeight) {
          top = window.innerHeight - tooltipHeight; // Prevent moving out of the bottom
        }

        // Set tooltip style with updated coordinates
        setTooltipStyle({
          position: 'fixed',
          left: `${left}px`,
          top: `${top}px`,
        });
      }
    },
    [mouseTrack]
  );

  const getPositionStyles = () => {
    if (mouseTrack) return ''; // No position styles for mouse tracking

    const positionStyles: { [key: string]: string } = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    };
    return positionStyles[position] || positionStyles.top;
  };

  const getArrowPosition = () => {
    if (mouseTrack) return ''; // No arrow for mouse tracking

    const arrowPosition: { [key: string]: string } = {
      top: 'bottom-0 left-1/2 transform -translate-x-1/2',
      bottom: 'top-0 left-1/2 transform -translate-x-1/2',
      left: 'right-0 top-1/2 transform -translate-y-1/2',
      right: 'left-0 top-1/2 transform -translate-y-1/2',
    };
    return arrowPosition[position] || arrowPosition.top;
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(e) => mouseTrack && handleMouseMove(e as unknown as MouseEvent)}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 p-2 py-1 rounded-md text-sm bg-deep dark:bg-soft text-light shadow-lg
            ${className ? ` ${className}` : ''} // Corrected space handling
            ${!mouseTrack && getPositionStyles()} 
            ${mouseTrack && 'fixed'}`} // Apply separate class for mouse tracking
          style={mouseTrack ? tooltipStyle : {}} // Apply dynamic tooltip style when mouse tracking
        >
          {content}
          {!mouseTrack && (
            <div
              className={`absolute w-3 h-3 bg-deep dark:bg-soft transform rotate-45 -z-10 ${getArrowPosition()}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
