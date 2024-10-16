import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto"> 
      <p>© {new Date().getFullYear()} Inventory Management. All rights reserved.</p>
    </footer>
  );
};

export default Footer;