import React from 'react';

interface DividerProps {
  align?: 'left' | 'center' | 'right' | 'top' | 'center' | 'bottom'; // Alignment options for text
  layout?: 'horizontal' | 'vertical';  // Layout type
  type?: 'solid' | 'dashed' | 'dotted'; // Line style
  className?: string;  // Additional Tailwind classes
  children?: React.ReactNode;  // Text content inside the divider
}

const Divider: React.FC<DividerProps> = ({
  align = 'center',
  layout = 'horizontal',
  type = 'solid',
  className = '',
  children,
}) => {
  const lineStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  // Alignment classes for horizontal and vertical layouts
  const alignmentClass = (layout === 'horizontal') 
    ? align === 'left' ? 'justify-start' 
      : align === 'right' ? 'justify-end' 
      : 'justify-center'
    : align === 'top' ? 'items-start' 
      : align === 'bottom' ? 'items-end' 
      : 'items-center';

  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row items-center' : 'flex-col'} ${alignmentClass} ${className}`}>
      {layout === 'horizontal' ? (
        <>
          {align === 'left' && children && (
            <div className="mr-2 flex-shrink-0 text-deep dark:text-light">
              {children}
            </div>
          )}
          <div className={`flex-grow border-b ${lineStyles[type]} border-border dark:border-coal`} />
          {align === 'center' && (
            <>
              <div className="px-2 flex-shrink-0 text-deep dark:text-light">{children}</div>
              <div className={`flex-grow border-b ${lineStyles[type]} border-border dark:border-coal`} />
            </>
          )}
          {align === 'right' && children && (
            <div className="ml-2 flex-shrink-0 text-deep dark:text-light">
              {children}
            </div>
          )}
        </>
      ) : (
        <>
          {align === 'top' && children && (
            <div className="mb-2 flex-shrink-0 text-deep dark:text-light">
              {children}
            </div>
          )}
          <div className={`h-full border-l ${lineStyles[type]} border-border dark:border-coal`} />
          {align === 'center' && (
            <>
              <div className="my-2 flex-shrink-0 text-deep dark:text-light">{children}</div>
              <div className={`h-full border-l ${lineStyles[type]} border-border dark:border-coal`} />
            </>
          )}
          {align === 'bottom' && children && (
            <div className="mt-2 flex-shrink-0 text-deep dark:text-light">
              {children}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Divider;
