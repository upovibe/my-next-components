import React from 'react';

// CardProps defines the properties the Card component will accept
interface CardProps {
  title: string;
  subTitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// Card component with flexible structure
const Card: React.FC<CardProps> = ({
  title,
  subTitle,
  header,
  footer,
  children,
  className = '',
}) => {
  return (
    <div
      className={`card bg-primary dark:bg-shade border border-border dark:border-coal rounded-lg shadow-md p-4 ${className}`}
      role="region"
      aria-labelledby="card-title"
    >
      {/* Render optional header */}
      {header && <div className="card-header mb-4">{header}</div>}

      <div className="card-body">
        {/* Render title and associate it with aria-labelledby */}
        <h2 id="card-title" className="text-deep dark:text-light text-xl font-bold mb-2">
          {title}
        </h2>

        {/* Render optional subtitle */}
        {subTitle && (
          <h3 className="text-soft dark:text-pale text-md font-medium mb-4">
            {subTitle}
          </h3>
        )}

        {/* Card content (children) */}
        <div className="card-content text-soft dark:text-pale">{children}</div>
      </div>

      {/* Render optional footer */}
      {footer && <div className="card-footer mt-4">{footer}</div>}
    </div>
  );
};

export default Card;