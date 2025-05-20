// src/components/Navbar.js - Make logo smaller
import React from 'react';
import { theme } from '../theme';
import { content } from '../content';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 p-4 flex justify-center items-center relative" 
      style={{ backgroundColor: 'rgba(38, 38, 36, 0.95)', borderBottom: `1px solid ${theme.colors.lines}` }}>
      
      {/* Smaller Logo in Top Right Corner */}
      <div className="h-10 w-10 absolute right-4 top-4">
        <img src={content.navbar.logo} alt="Logo" className="w-full h-full object-contain" />
      </div>
    </header>
  );
};

export default Navbar;