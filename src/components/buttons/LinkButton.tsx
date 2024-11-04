import React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  icon,
  className = '',
  onClick,
}) => {
  const iconOnly = !children;

  return (
    <Link
      href={href}
      className={`inline-block font-semibold transition-all duration-300 ease-linear ${className} ${
        iconOnly ? 'flex justify-center items-center' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      <span
        className={`flex ${iconOnly ? 'justify-center items-center w-full h-full' : 'items-center gap-2'}`}
      >
        {icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </span>
    </Link>
  );
};

export default LinkButton;
