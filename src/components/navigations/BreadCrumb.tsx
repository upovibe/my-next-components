import React from 'react';
import { MenuItem } from './types';
import { FaChevronRight } from 'react-icons/fa';

interface BreadCrumbProps {
  menuItems: MenuItem[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ menuItems }) => {
  return (
    <nav aria-label="Breadcrumb" className="border-border dark:border-coal border-2 p-2 px-3 rounded-md">
      <ol className="flex items-center gap-2">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.template ? (
              <a
                href={item.path}
                className="flex items-center gap-1 text-soft dark:text-pale hover:text-highlight dark:hover:text-ocean transition-all ease-linear duration-200"
              >
                {item.template}
                <span className="ml-1">{item.label}</span>
              </a>
            ) : (
              <a 
                href={item.path}
                className="text-sm font-semibold text-soft dark:text-pale hover:text-highlight dark:hover:text-ocean transition-all ease-linear duration-200"
                >{item.label}
              </a>
            )}
            {index < menuItems.length - 1 && (
              <FaChevronRight className="text-muted dark:text-faint text-sm" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
