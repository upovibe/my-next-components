import React from 'react';
import Nav from '@/components/layout/Nav'

const Header: React.FC = () => {
  return (
    <header className='bg-primary dark:bg-shade shadow-md fixed w-full z-50'>
      <Nav />     
    </header>
  );
};

export default Header;
