import React, { useState, useRef } from 'react';

interface SplitterPanelProps {
  children: React.ReactNode;
  className?: string;
}

const SplitterPanel: React.FC<SplitterPanelProps> = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

interface SplitterProps {
  layout?: 'horizontal' | 'vertical';  // Default is horizontal, can be set to vertical
  className?: string;                  // Additional Tailwind classes
  children: React.ReactNode[];         // At least two SplitterPanel components as children
}

const Splitter: React.FC<SplitterProps> = ({
  layout = 'horizontal',                // Default layout is horizontal
  className = '',
  children
}) => {
  const [panelSizes, setPanelSizes] = useState<number[]>([50, 50]);  // Initial panel sizes (50% each)
  const isDragging = useRef(false);  // Track whether dragging is active
  const containerRef = useRef<HTMLDivElement>(null);  // Ref to the splitter container

  const handleDragStart = () => {
    isDragging.current = true;
    document.body.style.cursor = layout === 'horizontal' ? 'col-resize' : 'row-resize';  // Change cursor during drag
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = 'auto';  // Reset cursor after drag
  };

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const totalSize = layout === 'horizontal' ? rect.width : rect.height;
    const offset = layout === 'horizontal' ? e.clientX - rect.left : e.clientY - rect.top;
    const firstPanelSize = Math.min(Math.max((offset / totalSize) * 100, 10), 90);  // Clamp between 10% and 90%
    const secondPanelSize = 100 - firstPanelSize;

    setPanelSizes([firstPanelSize, secondPanelSize]);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e);
    const handleMouseUp = () => handleDragEnd();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} ${className}`}
      style={{ height: '100%', width: '100%' }}
    >
      {/* First Panel */}
      <div
        className={`flex-shrink-0 ${layout === 'horizontal' ? 'w-1/2' : 'h-1/2'}`}
        style={{ flexBasis: `${panelSizes[0]}%` }}
      >
        {children[0]}  {/* First panel content */}
      </div>

      {/* Splitter handle */}
      <div
        className={`cursor-${layout === 'horizontal' ? 'col-resize' : 'row-resize'} bg-tertiary/50 hover:bg-tertiary dark:bg-shadow/50 dark:hover:bg-shadow transition-all ease-linear duration-200 ${layout === 'horizontal' ? 'w-2' : 'h-2'} flex-shrink-0`}
        onMouseDown={handleDragStart}
      />

      {/* Second Panel */}
      <div
        className={`flex-shrink-0 ${layout === 'horizontal' ? 'w-1/2' : 'h-1/2'}`}
        style={{ flexBasis: `${panelSizes[1]}%` }}
      >
        {children[1]}  {/* Second panel content */}
      </div>
    </div>
  );
};

// Exporting both components
export { Splitter, SplitterPanel };
