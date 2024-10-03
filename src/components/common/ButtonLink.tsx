import React from 'react';
import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="bg-gold dark:bg-accentgold inline-block px-5 py-2 rounded text-light uppercase font-semibold transition focus:ring-4 focus:ring-gold/50 dark:focus:ring-accentgold/50"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
