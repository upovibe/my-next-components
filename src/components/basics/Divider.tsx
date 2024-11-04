import React from 'react';

interface DividerProps {
  align?: 'left' | 'center' | 'right' | 'top' | 'center' | 'bottom';
  layout?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed' | 'dotted';
  className?: string;
  children?: React.ReactNode;
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

  const alignmentClass = (layout === 'horizontal')
    ? align === 'left' ? 'justify-start'
      : align === 'right' ? 'justify-end'
      : 'justify-center'
    : align === 'top' ? 'items-start'
      : align === 'bottom' ? 'items-end'
      : 'items-center';

  return (
    <div className={`flex bg-transparent ${layout === 'horizontal' ? 'flex-row items-center' : 'flex-col'} ${alignmentClass} ${className}`}>
      {layout === 'horizontal' ? (
        <>
          {align === 'left' && children && (
            <div className="mr-2 text-deep dark:text-light">
              {children}
            </div>
          )}
          <div className={`flex-grow border-b ${lineStyles[type]} border-border dark:border-coal`} />
          {align === 'center' && children ? (
            <>
              <div className="px-2 text-deep dark:text-light whitespace-nowrap">{children}</div>
              <div className={`flex-grow border-b ${lineStyles[type]} border-border dark:border-coal`} />
            </>
          ) : align === 'center' && !children ? (
            <div className={`flex-grow border-b ${lineStyles[type]} border-border dark:border-coal`} />
          ) : null}
          {align === 'right' && children && (
            <div className="ml-2 text-deep dark:text-light">
              {children}
            </div>
          )}
        </>
      ) : (
        <>
          {align === 'top' && children && (
            <div className="mb-2 text-deep dark:text-light">
              {children}
            </div>
          )}
          <div className={`h-full border-l ${lineStyles[type]} border-border dark:border-coal`} />
          {align === 'center' && children ? (
            <>
              <div className="my-2 text-deep dark:text-light">{children}</div>
              <div className={`h-full border-l ${lineStyles[type]} border-border dark:border-coal`} />
            </>
          ) : align === 'center' && !children ? (
            <div className={`h-full border-l ${lineStyles[type]} border-border dark:border-coal`} />
          ) : null}
          {align === 'bottom' && children && (
            <div className="mt-2 text-deep dark:text-light">
              {children}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Divider;
