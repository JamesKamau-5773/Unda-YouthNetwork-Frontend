import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28">{/* Padding for fixed navbar */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
