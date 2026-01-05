import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Navbar is handled in App.jsx */}
      <main className="pt-8">{/* Adjusted padding since App.jsx handles main pt-20 */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
