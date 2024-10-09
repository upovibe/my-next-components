import React from 'react';
import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string; // Allow additional custom classes
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, className = '' }) => {
  return (
    <Link
      href={href}
      className={`bg-highlight dark:bg-ocean inline-block px-5 py-2 rounded text-light uppercase font-semibold transition focus:ring-4 focus:ring-highlight/50 dark:focus:ring-ocean/50 ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
