import React from 'react';
import PortalNavbar from './PortalNavbar';
import WellnessPatternBackground from './WellnessPatternBackground';

const DashboardLayout = ({ children, headerContent }) => {
  return (
    // GLOBAL THEME: Anti-Glare Mint Background
    <div className="min-h-screen bg-[#F2F9FA] text-[#0B1E3B] relative font-sans selection:bg-[#E0F7FA] selection:text-[#006064]">
      
      {/* 1. Global Texture */}
      <div className="fixed inset-0 z-0">
         <WellnessPatternBackground />
      </div>

      {/* 2. Global Navbar (Sticky & High Z-Index) */}
      <div className="relative z-50">
        <PortalNavbar />
      </div>

      {/* 3. Global Content Container */}
      <main className="relative z-20 max-w-7xl mx-auto px-6 pt-8 pb-20 animate-in fade-in duration-500">
        
        {/* Header Section (Welcome Cards, Page Titles) */}
        {headerContent && (
          <div className="mb-8 w-full">
            {headerContent}
          </div>
        )}

        {/* Page Content */}
        <div className="w-full">
          {children}
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;