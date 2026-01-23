import React from 'react';
import PortalNavbar from './PortalNavbar';
import WellnessPatternBackground from './WellnessPatternBackground';

// DashboardLayout Refactored: "Mint & Navy" Aesthetic
// Changes: Removed Navy Header, Removed Negative Margins, Added Structural Spacing.

const DashboardLayout = ({ children, headerContent }) => {
  return (
    // 1. Background: Clean White/Gray (instead of Brand Ice or Navy)
    <div className="min-h-screen bg-gray-50 text-[#0B1E3B] relative font-sans">
      
      {/* 2. Background Pattern: Kept subtle (z-0). 
          Note: Ensure your pattern opacity is very low (e.g., 5%) so it doesn't distract. */}
      <WellnessPatternBackground />

     

      {/* 4. Navbar: Natural Block Stacking */}
      {/* It sits naturally at the top. z-30 ensures it floats above the pattern. */}
      <div className="relative z-30">
        <PortalNavbar />
      </div>

     
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        
        {/* Header Content */}
        {headerContent && (
          <div className="mb-8">
            {headerContent}
          </div>
        )}

        {/* Page Content */}
        <div className="space-y-6">
          {children}
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;