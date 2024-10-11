import React, { useState, useEffect, useCallback, ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode; // Content to be wrapped
    content: ReactNode; // Tooltip content
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center'; // Position of the tooltip
    mouseTrack?: boolean; // Enable mouse tracking
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = 'top',
    mouseTrack = false,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

    const positions = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-1',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-1',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-1',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-1',
        center: 'top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', // Center position
    };

    const arrowPositions = {
        top: 'after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-t-8 after:border-t-slate-700 after:border-r-8 after:border-r-transparent after:border-l-8 after:border-l-transparent',
        bottom: 'after:absolute after:bottom-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-b-8 after:border-b-slate-700 after:border-r-8 after:border-r-transparent after:border-l-8 after:border-l-transparent',
        left: 'after:absolute after:left-full after:top-1/2 after:transform after:-translate-y-1/2 after:border-l-8 after:border-l-slate-700 after:border-t-8 after:border-t-transparent after:border-b-8 after:border-b-transparent',
        right: 'after:absolute after:right-full after:top-1/2 after:transform after:-translate-y-1/2 after:border-r-8 after:border-r-slate-700 after:border-t-8 after:border-t-transparent after:border-b-8 after:border-b-transparent',
        center: '', // No arrow for center
    };

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (mouseTrack) {
            const tooltipWidth = 160; // Adjust as needed for width
            const tooltipHeight = 40; // Adjust as needed for height

            // Calculate position to ensure tooltip remains within bounds
            const left = Math.min(
                Math.max(event.clientX - tooltipWidth / 2, 0),
                window.innerWidth - tooltipWidth
            );
            const top = Math.min(
                Math.max(event.clientY - tooltipHeight - 10, 0),
                window.innerHeight - tooltipHeight
            );

            setTooltipStyle({
                position: 'fixed',
                left: `${left}px`,
                top: `${top}px`,
            });
        }
    }, [mouseTrack]);

    useEffect(() => {
        if (mouseTrack) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, [mouseTrack, handleMouseMove]);

    return (
        <div
            className="relative inline-block w-max"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {showTooltip && (
                <div
                    className={`w-40 text-sm absolute min-w-full border-2 border-slate-300/50 bg-slate-700 shadow-slate-800/10 text-white shadow-lg text-sm px-2 py-1 rounded-xl cursor-pointer z-50 ${
                        mouseTrack ? '' : positions[position]
                    } ${arrowPositions[position]}`}
                    style={mouseTrack ? tooltipStyle : {}}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
