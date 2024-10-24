import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  icon: Icon,
  iconPosition = 'right',
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`inline-block bg-highlight hover:bg-highlight/80 dark:bg-ocean dark:hover:bg-ocean/80  text-light font-semibold transition focus:ring-4 focus:ring-highlight/50 dark:focus:ring-ocean/50 ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon className="inline-block" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <Icon className="inline-block" />
        )}
      </span>
    </Link>
  );
};

export default ButtonLink;
